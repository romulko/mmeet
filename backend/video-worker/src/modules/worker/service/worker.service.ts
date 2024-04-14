import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { spawn } from 'child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { Message } from '../entity/entity';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { s3Client } from '../../../main';
import { messaging } from '../../firebase';
import { EOL } from 'os';

async function stream2buffer(stream: any): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();

    stream.on('data', (chunk) => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', (err) => reject(`error converting stream - ${err}`));
  });
}

const Bucket = 'mmeet';

@Injectable()
export class WorkerService {
  private readonly tempDir: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) {
    this.tempDir = configService.get('TEMP_DIR');

    // const filesStr = readdirSync(this.tempDir)
    //   .filter((value) => value.includes('.mp4'))
    //   .map((value) => `file '${this.tempDir}/${value}'`)
    //   .join(EOL);
    //
    // writeFileSync(`${this.tempDir}/videos.txt`, filesStr);
    //
    // // ffmpeg -f concat -i videos.txt -c:v libx265 -vtag hvc1 mainVideo.mp4
    // const ffmpeg = spawn(
    //   'ffmpeg -y -f concat -safe 0 -async 1 -i videos.txt mainVideo.mp4',
    //   {
    //     cwd: this.tempDir,
    //     shell: true,
    //   },
    // );
  }

  currentUserId: number;
  message: Message;

  @RabbitSubscribe({
    exchange: 'video',
    routingKey: 'cancel',
    queueOptions: { exclusive: true },
  })
  public async cancelHandler({ userId }: Message) {
    if (this.currentUserId !== userId) {
      return;
    }

    console.log(`-------------`);
    console.log(`cancel, userId:${userId}`);

    this.interruptFfmpeg();

    this.currentUserId = null;
  }

  @RabbitSubscribe({
    exchange: 'video',
    queue: 'start',
    queueOptions: { durable: true },
  })
  async startHandler(message: Message) {
    this.message = message;
    this.currentUserId = message.userId;

    console.log(`-------------`);
    console.log(
      `Hey, I have consumed a message: ${JSON.stringify(
        message,
      )}. Starting working on it...`,
    );

    const isLatestOneTask = await this.validateTaskIsLatestOne(message);

    if (!isLatestOneTask) {
      console.log(
        `I've consumed not a latest message, so I acknowledge it and do nothing`,
      );

      console.log('Finished');

      return;
    }

    try {
      console.log('2/3. Process a video');

      console.log(
        "The message from Queue and Redis are equal. It means I've consumed the latest one of appropriate user. Starting merging video...",
      );

      this.cleanup();

      await this.downloadVideos();

      await this.processVideos();

      this.cleanup();

      await this.deleteWorkerJobLog(message);

      this.notifyDevice(message);
    } catch (err: any) {
      if (err === 'canceled') {
        return;
      }

      console.error(`Error: ${JSON.stringify(err)}`);

      return new Nack(true);
    } finally {
      this.currentUserId = null;

      console.log('Finished');
    }
  }

  private async validateTaskIsLatestOne(message: Message) {
    console.log('1/3. Validate task is latest one');

    const redisMessageStr = await this.redis.get(message.userId.toString());

    if (!redisMessageStr) {
      return false;
    }

    const redisMessage = JSON.parse(redisMessageStr);

    return redisMessage.time === message.time;
  }

  private async deleteWorkerJobLog(message: Message) {
    console.log('3/3. Delete Worker Job Log');

    const isLatestOneTask = await this.validateTaskIsLatestOne(message);

    if (!isLatestOneTask) {
      console.log(
        "While I'm working, a user sent another request so my work out of date now. I wont delete message from Redis",
      );

      return;
    }

    this.redis.del(message.userId.toString());
  }

  private notifyDevice(message: Message) {
    messaging
      .send({
        token: message.fcmToken,
        data: { type: 'VIDEO_PROCESSING', videoIsProcessing: 'false' },
      })
      .catch(console.error);
  }

  private async downloadVideos() {
    console.log('Downloading videos...');

    if (!existsSync(this.tempDir)) {
      mkdirSync(this.tempDir, {
        recursive: true,
      });
    }

    // get all answers
    const answerKeys = this.message.answers.map(
      (value) => `${this.currentUserId}/video/answers/${value}.mp4`,
    );

    for (const answerKey of answerKeys) {
      const object = await s3Client.getObject({
        Bucket,
        Key: answerKey,
      });

      // it means canceled was received, so just interrupt downloading
      if (!this.currentUserId) {
        throw new Error('canceled');
      }

      const stream = await stream2buffer(object.Body);
      const fileName = answerKey.split('/').reverse()[0];

      const filePath = `${this.tempDir}/${fileName}`;

      writeFileSync(filePath, stream);

      console.log(`Downloaded, ${filePath}`);
    }
  }

  private async processVideos() {
    // no video, so just remove main video and do nothing
    if (readdirSync(this.tempDir).length === 0) {
      console.log(
        "No videos in user's folder, so I just remove main video and do nothing",
      );

      await s3Client.deleteObject({
        Bucket,
        Key: `${this.currentUserId}/video/mainVideo.mp4`,
      });

      return;
    }

    let promiseResolve = null;
    let promiseReject = null;

    const promise = new Promise((resolve, reject) => {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    const filesStr = readdirSync(this.tempDir)
      .sort((a, b) => {
        const num1 = parseInt(a.split('.')[0], 10);
        const num2 = parseInt(b.split('.')[0], 10);

        return num1 - num2;
      })
      .map((value) => `file '${this.tempDir}/${value}'`)
      .join(EOL);

    writeFileSync(`${this.tempDir}/videos.txt`, filesStr);

    console.log('Start ffmpeg');

    // ffmpeg -f concat -i videos.txt -c:v libx265 -vtag hvc1 mainVideo.mp4
    const ffmpeg = spawn(
      'ffmpeg -y -f concat -safe 0 -async 1 -i videos.txt mainVideo.mp4',
      {
        cwd: this.tempDir,
        shell: true,
      },
    );

    ffmpeg.on('exit', async (code, signal) => {
      switch (code) {
        case 0: {
          console.log('ffmpeg has complete the job successfully (code: 0)');

          const path = `${this.tempDir}/mainVideo.mp4`;

          console.log(`uploading mainVideo.mp4...`);

          await s3Client.putObject({
            Bucket,
            Key: `${this.currentUserId}/video/mainVideo.mp4`,
            Body: readFileSync(path),
            ACL: 'public-read',
            ContentType: 'video/mp4',
          });

          promiseResolve();
          break;
        }
        case 255: {
          console.log('ffmpeg canceled (code: 2555)');
          promiseReject('canceled');
          break;
        }
        default: {
          console.log(
            `ffmpeg has complete the job with error. (code: ${code}, signal: ${signal}). I remove temp output file`,
          );

          promiseReject(new Error(`${code}`));
        }
      }
    });

    return promise;
  }

  private cleanup() {
    console.log(`cleanup ${this.tempDir}`);

    rmSync(this.tempDir, { force: true, recursive: true });
  }

  private interruptFfmpeg() {
    spawn('killall -INT ffmpeg', {
      shell: true,
    });
  }

  private spawnToPromise(command: string, path: string) {
    return new Promise((resolve, reject) => {
      const process = spawn(command, {
        cwd: path,
        shell: true,
      });

      process.on('exit', (code) => {
        resolve(code);
      });

      process.on('error', (err) => {
        reject(err);
      });
    });
  }
}

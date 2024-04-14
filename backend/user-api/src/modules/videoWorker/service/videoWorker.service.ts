import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { Channel } from 'amqp-connection-manager';
import { Message } from './types';
import { User } from '../../user/entity/user.entity';

@Injectable()
export default class VideoWorkerService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @InjectRedis() private readonly redis: Redis,
  ) {
    this.assertQueue();
  }

  private assertQueue() {
    const channel = this.amqpConnection.channel as Channel;
    channel.assertQueue('start', { durable: true }).then(() => {
      channel.bindQueue('start', 'video', 'start');
    });
  }

  async triggerProcessing(messageInput: Omit<Message, 'time'>) {
    this.publish('cancel', messageInput);

    const message: Message = {
      ...messageInput,
      time: Date.now(),
    };

    await this.putWorkerJobLog(message);

    this.publish('start', message, true);
  }

  private publish(
    routingKey: string,
    message: Omit<Message, 'time'>,
    persist?: boolean,
  ) {
    console.log(
      `publish routingKey: ${routingKey}, message: ${JSON.stringify(message)}`,
    );

    this.amqpConnection.publish('video', routingKey, message, { persist });
  }

  private putWorkerJobLog(message: Message) {
    console.log(`putWorkerJobLog, message: ${JSON.stringify(message)}`);

    return this.redis.set(message.userId.toString(), JSON.stringify(message));
  }
}

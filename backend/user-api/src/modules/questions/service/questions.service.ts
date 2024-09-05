import { Injectable } from '@nestjs/common';
import { AuthUser } from '../../auth/entity/authUser.entity';
import { questions as questionsEn } from '../data/questions.en';
import { questions as questionsRu } from '../data/questions.ru';
import { questions as questionsUk } from '../data/questions.uk';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '../entity/answer.entity';
import { Repository } from 'typeorm';
import { FileUpload } from 'graphql-upload';
import {
  QuestionAnswerInput,
  QuestionDeleteAnswerInput,
  QuestionsInput,
} from '../entity/question.input';
import { ConfigService } from '@nestjs/config';
import { User } from '../../user/entity/user.entity';
import VideoWorkerService from '../../videoWorker/service/videoWorker.service';
import { Question } from '../entity/question.entity';
import { streamToBufferPromise } from '../../../utils/buffer.utils';
import { S3Service } from '../../s3/service/S3.service';
import { MessagingService } from '../../firebase/service/messaging.service';

const languageToQuestions = {
  en: questionsEn,
  ru: questionsRu,
  uk: questionsUk,
};

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly videoWorkerService: VideoWorkerService,
    private readonly s3Service: S3Service,
    private readonly messagingService: MessagingService,
  ) {}

  async findAll(input: QuestionsInput) {
    const user = await this.userRepository.findOne({
      where: { id: input.userId },
    });

    const questions = user.language
      ? languageToQuestions[user.language]
      : languageToQuestions.en;

    const answers = await this.answerRepository.find({
      where: { user: { id: input.userId } },
    });

    questions.forEach(
      (question) =>
        (question.answer = answers.find(
          (answer) => answer.questionId === question.id,
        )),
    );

    return questions as Question[];
  }

  deleteAnswers(user: AuthUser) {
    return this.answerRepository.query(
      `DELETE FROM answer WHERE "userId"=${user.id}`,
    );
  }

  private async findAnswer(userId: User['id'], questionId: Question['id']) {
    return await this.answerRepository.findOne({
      where: { user: { id: userId }, questionId },
    });
  }

  async answer(
    { questionId, userId, duration }: QuestionAnswerInput,
    { createReadStream }: FileUpload,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    this.notifyStartProcessing(user);

    await this.s3Service.putObject({
      Body: await streamToBufferPromise(createReadStream),
      Key: `${userId}/video/answers/${questionId}.mp4`,
      ContentType: 'video/mp4',
    });

    let answer = await this.findAnswer(userId, questionId);

    if (!answer) {
      answer = this.answerRepository.create();
      answer.questionId = questionId;
      answer.user = { id: userId };
    }

    answer.lastChangedDateTime = new Date();
    answer.duration = duration;

    answer = await this.answerRepository.save(answer);

    const questions = await this.findAll({ userId });
    const answers = questions
      .filter((value) => !!value.answer)
      .map((value) => value.id);

    this.videoWorkerService.triggerProcessing({
      userId,
      answers,
      fcmToken: user.fcmToken,
    });

    return answer;
  }

  async answerDelete({ questionId, userId }: QuestionDeleteAnswerInput) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    this.notifyStartProcessing(user);

    const answer = await this.findAnswer(userId, questionId);
    await this.answerRepository.remove({ ...answer });

    await this.s3Service.deleteObject({
      Key: `${userId}/video/answers/${questionId}.mp4`,
    });

    const questions = await this.findAll({ userId: userId });
    const answers = questions
      .filter((value) => !!value.answer)
      .map((value) => value.id);

    this.videoWorkerService.triggerProcessing({
      userId,
      answers,
      fcmToken: user.fcmToken,
    });

    return answer;
  }

  private notifyStartProcessing(user: User) {
    this.messagingService.notify(user, {
      data: { type: 'VIDEO_PROCESSING', videoIsProcessing: 'true' },
    });
  }
}

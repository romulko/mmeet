import { Module } from '@nestjs/common';
import { QuestionsResolver } from './resolver/questions.resolver';
import { QuestionsService } from './service/questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entity/answer.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from '../user/entity/user.entity';
import { VideoWorkerModule } from '../videoWorker/videoWorker.module';
import { S3Module } from '../s3/S3.module';
import { QuestionsController } from './controller/questions.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Answer, User]),
    VideoWorkerModule,
    S3Module,
    FirebaseModule,
  ],
  exports: [QuestionsService],
  providers: [QuestionsResolver, QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}

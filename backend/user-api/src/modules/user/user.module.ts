import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controller/user.controller';
import { Match } from '../match/entity/match.entity';
import { MatchModule } from '../match/match.module';
import { QuestionsModule } from '../questions/questions.module';
import { S3Module } from '../s3/S3.module';
import { AuthService } from '../auth/service/auth.service';
import { Answer } from '../questions/entity/answer.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UserController],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Match, Answer]),
    MatchModule,
    QuestionsModule,
    S3Module,
    HttpModule,
  ],
  providers: [UserService, UserResolver, AuthService],
  exports: [UserService],
})
export class UserModule {}

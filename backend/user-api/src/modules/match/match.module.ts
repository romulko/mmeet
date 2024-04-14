import { Module } from '@nestjs/common';
import { MatchResolver } from './resolver/match.resolver';
import { MatchService } from './service/match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entity/match.entity';
import { User } from '../user/entity/user.entity';
import { MatchController } from './controller/match.controller';
import { Answer } from '../questions/entity/answer.entity';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  controllers: [MatchController],
  imports: [TypeOrmModule.forFeature([Match, User, Answer]), FirebaseModule],
  exports: [MatchService],
  providers: [MatchResolver, MatchService],
})
export class MatchModule {}

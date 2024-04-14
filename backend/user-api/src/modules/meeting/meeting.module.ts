import { Module } from '@nestjs/common';
import { MeetingResolver } from './resolver/meeting.resolver';
import { MeetingService } from './service/meeting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address, Meeting } from './entity/meeting.entity';
import { User } from '../user/entity/user.entity';
import { Match } from '../match/entity/match.entity';
import { HttpModule } from '@nestjs/axios';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, Meeting, Address, User]),
    FirebaseModule,
    HttpModule,
  ],
  providers: [MeetingResolver, MeetingService],
})
export class MeetingModule {}

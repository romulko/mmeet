import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { MessagingService } from './service/messaging.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [MessagingService],
  providers: [MessagingService],
})
export class FirebaseModule {}

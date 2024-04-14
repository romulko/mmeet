import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { PaymentResolver } from './resolver/payment.resolver';
import { PaymentService } from './service/payment.service';
import { Payment } from './entity/payment.entity';
import { Match } from '../match/entity/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Match, Payment])],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}

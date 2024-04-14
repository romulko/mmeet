import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { AuthUser } from '../../auth/entity/authUser.entity';
import { AvailableMeetingsPerWeek, Payment } from '../entity/payment.entity';
import { Match } from '../../match/entity/match.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  availableMeetingsPerWeek() {
    return { count: 3 } as AvailableMeetingsPerWeek;
  }

  async availableMeetingsInThisWeek(authUser: AuthUser) {
    const matches = await this.matchRepository
      .createQueryBuilder('match')
      .where(
        '("match"."fromUserId" = :userId OR "match"."toUserId" = :userId)',
        { userId: authUser.id },
      )
      .leftJoinAndSelect('match.meeting', 'meeting')
      .leftJoinAndSelect('meeting.acceptedAddress', 'acceptedAddress')
      .orderBy('acceptedAddress.time')
      .getMany();

    const matchesCount = matches
      .filter((value) => value.meeting?.acceptedAddress?.time)
      .map((value) => value.meeting.acceptedAddress.time)
      .filter((value) => checkIfInThisWeek(value));

    return {
      count: this.availableMeetingsPerWeek().count - matchesCount.length,
    } as AvailableMeetingsPerWeek;
  }
}

const checkIfInThisWeek = (date: Date) => {
  const now = new Date();

  const monday = new Date();
  monday.setHours(0);
  monday.setMinutes(0);
  monday.setSeconds(0);
  monday.setDate(monday.getDate() - now.getDay() + 1);

  const sunday = new Date();
  sunday.setHours(23);
  sunday.setMinutes(59);
  sunday.setSeconds(59);
  sunday.setDate(sunday.getDate() + (7 - now.getDay()));

  return date.getTime() > monday.getTime() && date.getTime() < sunday.getTime();
};

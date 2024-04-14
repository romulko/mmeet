import { Body, Controller, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchService } from '../service/match.service';
import { User } from '../../user/entity/user.entity';
import { DeleteInput } from './types';

@Controller('match')
export class MatchController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly matchService: MatchService,
  ) {}

  @Delete()
  async deleteMatch(@Body() { email }: DeleteInput) {
    console.log(`delete ${email}`);

    const user = await this.userRepository.findOne({ where: { email } });

    await this.matchService.deleteMatches(user);

    return true;
  }
}

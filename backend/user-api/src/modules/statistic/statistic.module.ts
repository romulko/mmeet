import { Module } from '@nestjs/common';
import { StatisticService } from './service/statistic.service';
import { StatisticResolver } from './resolver/statistic.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { StatisticController } from './controller/statistic.controller';

@Module({
  controllers: [StatisticController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [StatisticResolver],
  providers: [StatisticResolver, StatisticService],
})
export class StatisticModule {}

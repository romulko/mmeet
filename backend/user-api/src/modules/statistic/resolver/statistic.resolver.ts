import { Context, Query, Resolver } from '@nestjs/graphql';
import { StatisticEntity } from '../entity/statistic.entity';
import { StatisticService } from '../service/statistic.service';
import { AuthUser } from '../../auth/entity/authUser.entity';

@Resolver(() => StatisticEntity)
export class StatisticResolver {
  constructor(private readonly statisticService: StatisticService) {}

  @Query(() => StatisticEntity)
  inviteFriendStatistic(@Context('authUser') authUser: AuthUser) {
    return this.statisticService.getStatistic(authUser);
  }
}

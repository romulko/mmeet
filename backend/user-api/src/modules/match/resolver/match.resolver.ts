import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MatchService } from '../service/match.service';
import { AuthUser } from '../../auth/entity/authUser.entity';
import {
  MatchFindOneInput,
  MatchInterestingPhotoInput,
  MatchInterestingVideoInput,
  MatchSkipPhotoInput,
  MatchSkipVideoInput,
} from '../entity/match.input';
import { Match } from '../entity/match.entity';

@Resolver(() => Match)
export class MatchResolver {
  constructor(private matchService: MatchService) {}

  @Query(() => [Match])
  async matches(@Context('authUser') authUser: AuthUser) {
    return this.matchService.findAll(authUser);
  }

  @Query(() => Match, { nullable: true })
  async match(@Args('input') input: MatchFindOneInput) {
    return this.matchService.findOne(input);
  }

  @Mutation(() => Match)
  async interestingPhoto(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: MatchInterestingPhotoInput,
  ) {
    return this.matchService.interestingPhoto(authUser, input);
  }

  @Mutation(() => Match)
  async skipPhoto(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: MatchSkipPhotoInput,
  ) {
    return this.matchService.skipPhoto(authUser, input);
  }

  @Mutation(() => Match)
  async interestingVideo(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: MatchInterestingVideoInput,
  ) {
    return this.matchService.interestingVideo(authUser, input);
  }

  @Mutation(() => Match)
  async skipVideo(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: MatchSkipVideoInput,
  ) {
    return this.matchService.skipVideo(authUser, input);
  }
}

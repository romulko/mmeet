import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Meeting } from '../entity/meeting.entity';
import { MeetingService } from '../service/meeting.service';
import { AuthUser } from '../../auth/entity/authUser.entity';
import {
  MeetingAcceptInput,
  MeetingCancelInput,
  MeetingProposeInput,
} from '../entity/meeting.input';

@Resolver(() => Meeting)
export class MeetingResolver {
  constructor(private meetingService: MeetingService) {}

  @Mutation(() => Meeting)
  async propose(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: MeetingProposeInput,
  ) {
    return this.meetingService.propose(authUser, input);
  }

  @Mutation(() => Meeting)
  async accept(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: MeetingAcceptInput,
  ) {
    return this.meetingService.accept(authUser, input);
  }

  @Mutation(() => Meeting)
  async cancel(
    @Context('authUser') authUser: AuthUser,
    @Args('input') input: MeetingCancelInput,
  ) {
    return this.meetingService.cancel(authUser, input);
  }
}

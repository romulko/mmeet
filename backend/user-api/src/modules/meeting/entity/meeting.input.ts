import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MeetingProposeInput {
  @Field()
  matchId: number;

  @Field()
  placeId: string;

  @Field()
  placeLabel: string;

  @Field()
  time: Date;
}

@InputType()
export class MeetingAcceptInput {
  @Field()
  matchId: number;
}

@InputType()
export class MeetingCancelInput {
  @Field()
  matchId: number;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MatchFindOneInput {
  @Field()
  matchId: number;
}

@InputType()
export class MatchInterestingPhotoInput {
  @Field()
  interestingUserId: number;
}

@InputType()
export class MatchSkipPhotoInput {
  @Field()
  skipUserId: number;
}

@InputType()
export class MatchInterestingVideoInput {
  @Field()
  matchId: number;
}

@InputType()
export class MatchSkipVideoInput {
  @Field()
  matchId: number;
}

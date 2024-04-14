import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvitedUser {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  invitedCount: number;

  @Field(() => Int)
  meetingsCount: number;
}

@ObjectType()
export class StatisticEntity {
  @Field(() => [InvitedUser])
  invitedUsers: InvitedUser[];
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QuestionsInput {
  @Field()
  userId: number;
}

@InputType()
export class QuestionAnswerInput {
  @Field()
  userId: number;

  @Field()
  questionId: number;

  @Field()
  duration: number;
}

@InputType()
export class QuestionDeleteAnswerInput {
  @Field()
  userId: number;

  @Field()
  questionId: number;
}

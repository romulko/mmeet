import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Answer } from './answer.entity';

@ObjectType()
export class Question {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;

  @Field(() => [QuestionItem])
  questions: QuestionItem[];

  @Field(() => Answer, { nullable: true })
  answer?: Answer;
}

@ObjectType()
export class QuestionItem {
  @Field(() => Int)
  id: number;

  @Field()
  text: string;
}

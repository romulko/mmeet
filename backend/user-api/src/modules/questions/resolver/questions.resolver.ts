import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Question } from '../entity/question.entity';
import { QuestionsService } from '../service/questions.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import {
  QuestionAnswerInput,
  QuestionDeleteAnswerInput,
  QuestionsInput,
} from '../entity/question.input';
import { Answer } from '../entity/answer.entity';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private questionService: QuestionsService) {}

  @Query(() => [Question])
  async questions(@Args('input') input: QuestionsInput) {
    return this.questionService.findAll(input);
  }

  @Mutation(() => Answer)
  async questionAnswer(
    @Args('input') input: QuestionAnswerInput,
    @Args({ name: 'video', type: () => GraphQLUpload }) video: FileUpload,
  ) {
    return this.questionService.answer(input, video);
  }

  @Mutation(() => Answer)
  async questionDeleteAnswer(@Args('input') input: QuestionDeleteAnswerInput) {
    return this.questionService.answerDelete(input);
  }
}

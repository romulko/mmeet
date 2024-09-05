import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaymentBuyMmeetsInput {
  @Field()
  productId: string;

  @Field()
  purchase: string;
}

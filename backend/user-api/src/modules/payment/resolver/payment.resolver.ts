import { Context, Query, Resolver } from '@nestjs/graphql';
import {
  AvailableMeetingsInThisWeek,
  AvailableMeetingsPerWeek,
  Payment,
} from '../entity/payment.entity';
import { PaymentService } from '../service/payment.service';
import { AuthUser } from '../../auth/entity/authUser.entity';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Query(() => AvailableMeetingsPerWeek)
  availableMeetingsPerWeek() {
    return this.paymentService.availableMeetingsPerWeek();
  }

  @Query(() => AvailableMeetingsInThisWeek)
  availableMeetingsInThisWeek(@Context('authUser') authUser: AuthUser) {
    return this.paymentService.availableMeetingsInThisWeek(authUser);
  }
}

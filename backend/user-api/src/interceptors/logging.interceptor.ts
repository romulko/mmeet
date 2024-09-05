import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (ctx.req?.body) {
      const { operationName, variables } = ctx.req.body;

      console.log(
        `${new Date().toISOString()} operation: ${operationName}, variables: ${JSON.stringify(
          variables,
        )}, userId: ${ctx.authUser?.id}`,
      );
    }

    return next.handle();
  }
}

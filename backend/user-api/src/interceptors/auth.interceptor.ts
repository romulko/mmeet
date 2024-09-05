import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../modules/auth/service/auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (ctx.headers) {
      const token = getToken(ctx.headers.authorization);

      if (token) {
        ctx.authUser = this.authService.getAuthUserFromToken(token);
      }
    }

    return next.handle();
  }
}

const getToken = (authorizationHeader?: string) => {
  if (!authorizationHeader) {
    return null;
  }

  const split = authorizationHeader.split(' ');

  if (split[0] !== 'Bearer') {
    return null;
  }

  return split[1];
};

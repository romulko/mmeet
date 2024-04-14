import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { graphqlUploadExpress } from 'graphql-upload';
import { AuthService } from './modules/auth/service/auth.service';
import { ConfigService } from '@nestjs/config';

const maxFileSize = 500 * 1000 * 1000; // 500mb

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize, maxFiles: 10 }));

  app.enableCors({
    origin: ['https://mmeet.app'],
  });

  app.useGlobalInterceptors(
    new AuthInterceptor(app.get(AuthService)),
    new LoggingInterceptor(),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
}

bootstrap();

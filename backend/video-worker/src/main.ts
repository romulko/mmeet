import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { S3 } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

export let s3Client: S3;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
  );

  const configService = app.get(ConfigService);

  s3Client = new S3({
    endpoint: configService.get('DIGITAL_OCEAN_S3_ENDPOINT'),
    region: configService.get('DIGITAL_OCEAN_S3_REGION'),
    credentials: {
      accessKeyId: configService.get('DIGITAL_OCEAN_S3_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('DIGITAL_OCEAN_S3_SECRET_ACCESS_KEY'),
    },
  });

  await app.listen();
}

bootstrap();

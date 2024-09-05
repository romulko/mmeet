import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { VideoWorkerModule } from './modules/videoWorker/videoWorker.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MatchModule } from './modules/match/match.module';
import { MeetingModule } from './modules/meeting/meeting.module';
import { S3Module } from './modules/s3/S3.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ErrorHandlerModule } from './modules/errorHandler/errorHandler.module';
import { MailModule } from './modules/mail/mail.module';
import { PaymentModule } from './modules/payment/payment.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { FirebaseModule } from './modules/firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'test'
          ? ['.env.test']
          : ['.env.local', '.env.prod'],
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          process.env.NODE_ENV === 'test'
            ? 'src/**/*.entity.ts'
            : 'dist/**/*.entity.js',
        ],
        autoSchemaSync: true,
        synchronize: true,
        // logging: 'all',
      }),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),

    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
          keepAlive: 60,
        },
      }),
    }),

    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          region: configService.get('DIGITAL_OCEAN_S3_REGION'),
          endpoint: configService.get('DIGITAL_OCEAN_S3_ENDPOINT'),
          credentials: {
            accessKeyId: configService.get('DIGITAL_OCEAN_S3_ACCESS_KEY_ID'),
            secretAccessKey: configService.get(
              'DIGITAL_OCEAN_S3_SECRET_ACCESS_KEY',
            ),
          },
        }),
      },
      services: [S3],
    }),

    S3Module,
    UserModule,
    AuthModule,
    QuestionsModule,
    VideoWorkerModule,
    MatchModule,
    MeetingModule,
    ErrorHandlerModule,
    MailModule,
    PaymentModule,
    StatisticModule,
    FirebaseModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkerModule } from './modules/worker/worker.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

const getEnvFile = () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return ['.env.test'];
    case 'prod':
      return ['.env.prod'];
    default:
      return ['.env.local'];
  }
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFile(),
      isGlobal: true,
    }),

    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
          keepAlive: 120,
        },
      }),
    }),

    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RABBITMQ_USER');
        const password = configService.get('RABBITMQ_PASSWORD');
        const host = configService.get('RABBITMQ_HOST');

        return {
          exchanges: [
            {
              name: 'video',
              type: 'topic',
            },
          ],
          uri: `amqp://${user}:${password}@${host}`,
          connectionInitOptions: { wait: true },
          prefetchCount: 1,
        };
      },
    }),

    WorkerModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import VideoWorkerService from './service/videoWorker.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
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
        };
      },
    }),

    TypeOrmModule.forFeature([User]),
  ],
  providers: [VideoWorkerService],
  exports: [VideoWorkerService],
})
export class VideoWorkerModule {}

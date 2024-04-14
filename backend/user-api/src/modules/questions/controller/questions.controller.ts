import { Controller, Get, Param } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Controller('questions')
export class QuestionsController {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  @Get('/isVideoProcessing/:userId')
  async isVideoProcessing(@Param() { userId }) {
    const isExists = await this.redis.exists(userId);

    return isExists === 1;
  }
}

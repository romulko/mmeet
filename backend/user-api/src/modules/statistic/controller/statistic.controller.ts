import { Controller, Get } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

const EXPIRES_AFTER = 5 * 60 * 1000; // 5 minutes

@Controller('statistic')
export class StatisticController {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Get('locations')
  async getLocations() {
    const redisKey = 'statistic.locations';
    const redisData = await this.redis.get(redisKey);

    if (redisData) {
      const redisDataObj = JSON.parse(redisData);

      if (redisDataObj.lastUpdatedAt + EXPIRES_AFTER > Date.now()) {
        return this.convert(redisDataObj.locations);
      }
    }

    const data = await this.entityManager.query(
      'SELECT COUNT ("cityId"), "cityLat" as "lat", "cityLng" as "lng" FROM "user" WHERE "cityLat" IS NOT NULL GROUP BY "cityLat", "cityLng"',
    );

    this.redis.set(
      redisKey,
      JSON.stringify({
        lastUpdatedAt: Date.now(),
        locations: data,
      }),
    );

    return this.convert(data);
  }

  private convert(data: any) {
    return data.map((value) => ({
      count: parseInt(value.count),
      lat: parseFloat(value.lat),
      lng: parseFloat(value.lng),
    })) as Response[];
  }
}

interface Response {
  count: number;
  lat: number;
  lng: number;
}

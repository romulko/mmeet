import { Module } from '@nestjs/common';
import { WorkerService } from './service/worker.service';

@Module({
  imports: [],
  providers: [WorkerService],
})
export class WorkerModule {}

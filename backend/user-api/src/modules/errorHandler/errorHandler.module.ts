import { Module } from '@nestjs/common';
import { ErrorHandlerController } from './controller/errorHandler.controller';
import { ErrorHandlerService } from './service/errorHandler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorEntity } from './entity/error.entity';

@Module({
  controllers: [ErrorHandlerController],
  providers: [ErrorHandlerController, ErrorHandlerService],
  imports: [TypeOrmModule.forFeature([ErrorEntity])],
})
export class ErrorHandlerModule {}

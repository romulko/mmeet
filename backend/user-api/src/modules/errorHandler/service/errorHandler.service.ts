import { Injectable } from '@nestjs/common';
import { ErrorDto } from '../entity/error.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorEntity } from '../entity/error.entity';

@Injectable()
export class ErrorHandlerService {
  constructor(
    @InjectRepository(ErrorEntity)
    private readonly errorEntityRepository: Repository<ErrorEntity>,
  ) {}
  handle(errorDto: ErrorDto) {
    const errorEntity = this.errorEntityRepository.create(errorDto);
    errorEntity.userId = errorDto.userId;
    errorEntity.error = JSON.parse(errorDto.error);
    this.errorEntityRepository.save(errorEntity);
    return true;
  }
}

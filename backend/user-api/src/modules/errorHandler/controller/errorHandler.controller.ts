import { Body, Controller, Post } from '@nestjs/common';
import { ErrorDto } from '../entity/error.dto';
import { ErrorHandlerService } from '../service/errorHandler.service';

@Controller('errorHandler')
export class ErrorHandlerController {
  constructor(private readonly errorHandlerService: ErrorHandlerService) {}

  @Post('handle')
  handle(@Body() errorDto: ErrorDto) {
    return this.errorHandlerService.handle(errorDto);
  }
}

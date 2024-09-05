import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('validateToken')
  async validateToken(@Query('token') token: string) {
    return !!(await this.authService.validateToken(token));
  }
}

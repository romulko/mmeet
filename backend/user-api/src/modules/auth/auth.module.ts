import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { AuthController } from './controller/auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

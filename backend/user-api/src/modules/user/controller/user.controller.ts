import { Body, Controller, Get, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../../match/entity/match.entity';
import { UserService } from '../service/user.service';
import { UpdateFCMTokenDTO } from './dto/user.dto';
import { AppleLoginInput, LoginInput } from '../../auth/entity/login.input';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../entity/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  @Put('loginGoogle')
  async loginGoogle(@Body() loginInput: LoginInput) {
    let user = await this.userService.findOneByEmail(loginInput);

    if (!user) {
      user = await this.userService.registerUser(loginInput);
    } else if (!user.googleId) {
      user.googleId = loginInput.googleId;
      await this.userRepository.save(user);
    }

    return this.authService.sign(user);
  }

  @Put('loginApple')
  async loginApple(@Body() loginInput: AppleLoginInput) {
    let user;

    if (loginInput.email) {
      user = await this.userService.findOneByEmail(loginInput);
    } else {
      user = await this.userService.findOneByAppleUserId(loginInput);
    }

    if (!user) {
      if (!loginInput.email) {
        throw new Error('Cannot register user');
      }

      user = await this.userService.registerUser(loginInput);
    }

    if (!user.appleUserId) {
      user.appleUserId = loginInput.appleUserId;
      await this.userRepository.save(user);
    }

    return this.authService.sign(user);
  }

  @Put('fcmToken')
  updateFCMToken(@Body() body: UpdateFCMTokenDTO) {
    this.userService.updateFCMToken(body);
    return true;
  }

  @Get('clean')
  async clean() {
    await this.matchRepository
      .createQueryBuilder('match')
      .connection.synchronize(true);

    return true;
  }
}

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '../../user/entity/user.entity';
import { sign } from 'jsonwebtoken';
import { AuthUser } from '../entity/authUser.entity';
import { UserService } from '../../user/service/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateToken(token: string) {
    const authUser = this.getAuthUserFromToken(token);

    const loadedUser = await this.userService.findOne(authUser); // TODO replace to exist. No need to load all entity

    if (!loadedUser) {
      console.log(`No user ${authUser.id} found by provided token ${token}`);

      return false;
    }

    return true;
  }

  sign({ id }: User) {
    const authUser: AuthUser = { id: id };

    return sign(
      JSON.parse(JSON.stringify(authUser)),
      this.configService.get('JWT_SECRET'),
      {
        expiresIn: '30d',
      },
    );
  }

  getAuthUserFromToken(token: string) {
    try {
      return jwt.verify(
        token,
        this.configService.get('JWT_SECRET'),
      ) as AuthUser;
    } catch (err) {
      console.error(`Token error, token: ${token}, ${err.message || err.name}`);
    }
  }
}

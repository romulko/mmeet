import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entity/user.entity';
import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import { app } from '../firebaseApp';

const messaging = firebase.messaging(app);

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public notify(user: User, data: any) {
    const token = user.fcmToken;

    if (!token) {
      return;
    }

    console.log('MessagingService.notify', {
      token,
      data,
    });

    messaging
      .send({
        token,
        data,
      })
      .catch((reason) => {
        // remove token if it was not found in FCM database
        const {
          errorInfo: { code, message },
        } = reason;

        if (
          code === 'messaging/registration-token-not-registered' &&
          message.includes('Requested entity was not found')
        ) {
          user.fcmToken = null;
          this.userRepository.save(user);
        }

        console.error(
          'FCM Token was not found. Remove user.fcmToken field',
          reason,
        );
      });
  }
}

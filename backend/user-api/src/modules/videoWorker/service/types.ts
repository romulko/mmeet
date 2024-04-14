import { User } from '../../user/entity/user.entity';

export interface Message {
  userId: User['id'];
  answers?: number[];
  time: number;
  fcmToken: string;
}

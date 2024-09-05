export interface Message {
  userId: number;
  answers?: number[];
  time: number;
  fcmToken: string;
}

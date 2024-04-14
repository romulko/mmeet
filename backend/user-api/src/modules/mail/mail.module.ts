import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MainController } from './controller/main.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [MainController],
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS'),
          },
        },
      }),
    }),
  ],
})
export class MailModule {}

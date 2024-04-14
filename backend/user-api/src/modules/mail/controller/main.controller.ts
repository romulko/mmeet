import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendBody } from './types';

@Controller('mail')
export class MainController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  send(@Body() body: SendBody) {
    console.log('MainController, send, ' + JSON.stringify(body));

    this.mailerService.sendMail({
      to: 'roman.omeetapp@gmail.com',
      subject: 'mmeet Contact Form',
      text: `Email: ${JSON.stringify(body, null, 2)}`,
    });
  }
}

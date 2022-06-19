import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { htmlMail, mail } from '../constaint/mail';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserMail({ email, token, subject, text, path }) {
    await this.mailerService.sendMail({
      to: email,
      from: mail.emailFrom,
      subject,
      text,
      html: htmlMail(path, token, text),
    });
  }
}

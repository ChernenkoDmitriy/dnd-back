import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { EmailSubjectEnum, EmailTextEnum } from '../enums/mail.enum';
import { mail } from '../constaint/mail';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthorizationService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
  ) {}
  async signUp(data) {
    const { result, token } = await this.userService.create(data);

    await this.mailService.sendUserMail({
      email: result.email,
      token,
      text: EmailTextEnum.CONF_EMAIL,
      subject: EmailSubjectEnum.CONF_EMAIL,
      path: mail.PATH_CONF,
    });

    return { data: { result, token } };
  }

  async confirmEmail(data) {
    await this.userService.confirmEmail(data);
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { EmailSubjectEnum, EmailTextEnum } from '../enums/mail.enum';
import { mail } from '../constaint/mail';
import { MailService } from '../mail/mail.service';
import { JwtService } from '../jwt/jwt.service';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class AuthorizationService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
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

  async confirmEmail({ token }) {
    const { result, error } = this.jwtService.decodeToken(
      token,
      process.env.JWT_CONF_KEY,
    );

    if (error) {
      throw new HttpException('Invalid token', 401);
    }

    await this.userService.checkConfirmEmail(result.email);
  }

  async signIn(data) {
    const result = await this.userService.getUserByEmail(data.email);

    if (!result) {
      throw new HttpException('Login or password is wrong', 403);
    }

    if (
      !(await this.bcryptService.comparePassword(
        data.password,
        result.password,
      ))
    ) {
      throw new HttpException('Login or password is wrong', 403);
    }

    if (!result.activated_at) {
      throw new HttpException('Please verify your account', 403);
    }

    const token = this.jwtService.generateToken(
      result,
      process.env.JWT_ACCESS_KEY,
    );

    return { data: { message: 'Successfully Entered', token } };
  }

  async forgotPassword({ email }) {
    const result = await this.userService.getUserByEmail(email);

    if (!result) {
      throw new HttpException('User with this email not found', 400);
    }

    const token = this.jwtService.generateToken(
      result,
      process.env.JWT_CONF_KEY,
    );

    await this.mailService.sendUserMail({
      email: result.email,
      token,
      text: EmailTextEnum.FORGOT_PASS_EMAIL,
      subject: EmailSubjectEnum.FORGOT_PASS_EMAIL,
      path: mail.PATH_FORGOT_PASS,
    });

    return { data: 'Check your mail', status: 200 };
  }

  async forgotPassMail({ token }) {
    const { result, error } = this.jwtService.decodeToken(
      token,
      process.env.JWT_CONF_KEY,
    );

    if (error) {
      throw new HttpException('Invalid token', 401);
    }

    const user = await this.userService.getUserByEmail(result.email);

    if (!user) {
      throw new HttpException('User with this email not found', 400);
    }
  }

  async changePassword({ password }, { token }) {
    const { result, error } = this.jwtService.decodeToken(
      token,
      process.env.JWT_CONF_KEY,
    );

    if (error) {
      throw new HttpException('Invalid token', 401);
    }

    const user = await this.userService.getUserByEmail(result.email);

    if (!user) {
      throw new HttpException('User with this email not found', 400);
    }

    await this.userService.changePassword(user, password);

    return 'Your password successfully updated';
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as moment from 'moment';
import { JwtService } from '../jwt/jwt.service';
import { mail } from '../constaint/mail';
import { EmailSubjectEnum, EmailTextEnum } from '../enums/mail.enum';
import { MailService } from '../mail/mail.service';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository,
    private jwtService: JwtService,
    private mailService: MailService,
    private bcryptService: BcryptService,
  ) {}

  async create(data) {
    data.confirmation_send_at = moment().toDate();
    data.password = await this.bcryptService.hashPassword(data.password);
    const user = this.userRepository.create(data);
    const result = await this.userRepository.save(user);
    const token = this.jwtService.generateToken(
      result,
      process.env.JWT_CONF_KEY,
    );

    return { result, token };
  }

  async checkConfirmEmail(email: string) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User with this email not found', 400);
    }

    const time = moment().toDate();

    if (Number(time) > Number(user.confirmation_send_at) + 3 * 3600 * 1000) {
      await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where({ id: user.id })
        .execute();
      throw new HttpException(
        'Sorry time to confirm your mail was expired, try to resign up',
        401,
      );
    }

    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ activated_at: moment() })
      .where({ id: user.id })
      .execute();
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async changePassword(user, password) {
    user.password = await this.bcryptService.hashPassword(password);
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: user.password })
      .where({ id: user.id })
      .execute();
  }
}

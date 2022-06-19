import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '../jwt/jwt.service';
import { MailService } from '../mail/mail.service';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService, UserService, JwtService, MailService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthorizationModule {}

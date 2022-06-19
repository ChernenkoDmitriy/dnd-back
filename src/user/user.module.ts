import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '../jwt/jwt.service';
import { MailService } from '../mail/mail.service';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService, MailService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User]), JwtService],
})
export class UserModule {}

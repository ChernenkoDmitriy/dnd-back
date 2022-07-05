import { Module } from '@nestjs/common';

import { AuthorizationModule } from './authorization/authorization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { BcryptModule } from './bcrypt/bcrypt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    AuthorizationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sluip',
      password: 's12122000',
      database: 'DND',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    JwtModule,
    MailModule,
    BcryptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

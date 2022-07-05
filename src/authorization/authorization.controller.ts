import { Body, Controller, Get, Post, Query, Response } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { Response as Res } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ConfirmEmailDto } from '../user/dto/confirm-email.dto';
import { Redirect } from '../enums/redirect';
import { SignInDto } from '../user/dto/sign-in.dto';
import { ForgotPasswordDto } from '../user/dto/forgot-password.dto';
import { PasswordDto } from '../user/dto/password.dto';
import { Headers } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('/authorization')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @Post('/sign-up')
  async singUp(@Body() dto: CreateUserDto, @Response() res: Res) {
    const { data } = await this.authorizationService.signUp(dto);

    return res.header('confirmation-token', data.token).json(data.result);
  }

  @Get('/confirm-email')
  async confirmEmail(@Query() dto: ConfirmEmailDto, @Response() res: Res) {
    await this.authorizationService.confirmEmail(dto);

    res.redirect(`${Redirect.CONF_EMAIL_SUCCESS_REDIRECT}`);
  }

  @Post('/sign-in')
  async singIn(@Body() dto: SignInDto, @Response() res: Res) {
    const { data } = await this.authorizationService.signIn(dto);

    return res.header('access-token', data.token).json(data.message);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Response() res: Res) {
    const { data, status } = await this.authorizationService.forgotPassword(
      dto,
    );

    res.status(status).json(data);
  }

  @Get('/forgot-password')
  async forgotPassMail(@Query() dto: ConfirmEmailDto, @Response() res: Res) {
    await this.authorizationService.forgotPassMail(dto);

    res.redirect(`${Redirect.FORGOT_PASSWORD_SUCCESS_REDIRECT}`);
  }

  @Post('change-password')
  async changePassword(@Body() dto: PasswordDto, @Headers() headers) {
    return await this.authorizationService.changePassword(dto, headers);
  }
}

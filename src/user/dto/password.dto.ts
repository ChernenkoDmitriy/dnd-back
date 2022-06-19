import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class PasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}

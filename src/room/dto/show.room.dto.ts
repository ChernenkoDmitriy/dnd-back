import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ShowRoomDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(600)
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  maxUsers: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  page: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  perPage: number;
}

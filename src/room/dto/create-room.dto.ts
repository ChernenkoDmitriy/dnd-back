import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  name: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(600)
  description: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(2)
  @Max(16)
  maxUsers: number;
}

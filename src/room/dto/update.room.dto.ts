import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateRoomDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @MinLength(3)
  @MaxLength(24)
  @IsOptional()
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(600)
  @IsOptional()
  description: string;

  @IsNumber()
  @Min(2)
  @Max(16)
  @IsOptional()
  maxUsers: number;
}

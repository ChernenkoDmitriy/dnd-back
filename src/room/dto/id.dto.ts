import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class IdDto {
  @IsNotEmpty()
  @IsString()
  id: number;
}

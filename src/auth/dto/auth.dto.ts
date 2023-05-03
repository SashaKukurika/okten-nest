import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5, 25)
  password: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5, 25)
  password: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}

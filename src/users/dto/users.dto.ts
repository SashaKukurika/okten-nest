import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { IsValidDays } from '../decorators/check.day.decorator';

export class CreateUserDto {
  @ApiProperty({ example: 'a629712a-b334-4eaf-be13-9228415cb95f' })
  userId: string;

  @ApiProperty({ required: true, example: 'sasha' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, example: 23 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(110)
  age: number;

  @ApiProperty({ required: true, example: 'username@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false, example: 'kyiv' })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  // table for staff
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsValidDays()
  dayOff: string;
}

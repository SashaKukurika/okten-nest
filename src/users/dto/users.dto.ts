import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'a629712a-b334-4eaf-be13-9228415cb95f' })
  userId: string;

  @ApiProperty({ required: false, example: 'sasha' })
  @IsString()
  name: string;

  @ApiProperty({ required: true, example: 'username@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

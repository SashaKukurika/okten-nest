import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async getUserList(@Req() reg: Request, @Res() res: any): Promise<User[]> {
    return res.status(HttpStatus.OK).json(await this.userService.getUserList());
  }

  @Post()
  async createUser(
    @Req() reg: Request,
    @Body() body: User,
    @Res() res: any,
  ): Promise<User> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }
}

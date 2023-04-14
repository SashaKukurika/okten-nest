import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
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

  @ApiParam({ name: 'userId', required: true })
  @Get('/:userId')
  async getUserById(
    @Req() reg: Request,
    @Res() res: any,
    @Param('userId') userId: string,
  ): Promise<User> {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserById(userId));
  }

  // @ApiParam({ name: 'userId', required: true })
  // @Get('/:userId')
  // async getUserInfo(
  //   @Req() reg: Request,
  //   @Res() res: any,
  //   @Param('userId') userId: string,
  // ): Promise<User> {
  //   return res
  //     .status(HttpStatus.OK)
  //     .json(await this.userService.getUserInfo(userId));
  // }

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
  @ApiParam({ name: 'userId', required: true })
  @Delete('/:userId')
  async deleteUser(
    @Req() req: Request,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.deleteUser(userId));
  }

  @ApiParam({ name: 'userId', required: true })
  @Patch('/:userId')
  async updateUser(
    @Req() req: Request,
    @Res() res: any,
    @Body() body: User,
    @Param('userId') userId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.updateUser(body, userId));
  }

  // @Post('/animals/:userId')
  // async addNewPet() {}
}

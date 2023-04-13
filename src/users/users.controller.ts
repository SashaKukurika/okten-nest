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

import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async getUserList(
    @Req() reg: any,
    @Res() res: any,
  ): Promise<CreateUserDto[]> {
    return res.status(HttpStatus.OK).json(await this.userService.getUserList());
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/:userId')
  async getUserById(
    @Req() reg: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ): Promise<CreateUserDto> {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserById(userId));
  }
  @Post()
  async createUser(
    @Req() reg: any,
    @Body() body: CreateUserDto,
    @Res() res: any,
  ) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }
  @ApiParam({ name: 'id', required: true })
  @Delete('/:userId')
  async deleteUser(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.deleteUser(userId));
  }

  @ApiParam({ name: 'id', required: true })
  @Patch('/:userId')
  async updateUser(
    @Req() req: any,
    @Res() res: any,
    @Body() body: CreateUserDto,
    @Param('userId') userId: any,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.updateUser(body, userId));
  }

  // @Post('/animals/:userId')
  // async addNewPet() {}
}

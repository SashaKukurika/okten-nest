import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { diskStorage } from 'multer';

import { editFileName, imageFileFilter } from '../core/file-upload/file.upload';
import { PetDto } from '../pets/dto/pet.dto';
import { PetsService } from '../pets/pets.service';
import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @Inject(forwardRef(() => PetsService))
    private readonly petsService: PetsService,
  ) {}
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createUser(
    @Req() req: any,
    @Body() body: CreateUserDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      body.avatar = `public/${file.filename}`;
    }
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

  @Post('/animals/:userId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './public/animals',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  async addNewPet(
    @Req() req: Request,
    @Res() res: any,
    @Body() body: PetDto,
    @Param('userId') userId: string,
    @UploadedFile()
    files: { image?: Express.Multer.File[]; logo?: Express.Multer.File[] },
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `User with id: ${userId} not found`,
      });
    }
    if (files?.image) {
      body.image = `./public/animals/${files.image[0].filename}`;
    }
    if (files?.logo) {
      body.logo = `./public/animals/${files.logo[1].filename}`;
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.createAnimal(body, userId));
  }
}

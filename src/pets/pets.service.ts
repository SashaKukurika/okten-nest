import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Pets } from '@prisma/client';

import { PrismaService } from '../core/orm/prisma.service';
import { UsersService } from '../users/users.service';
import { PetDto } from './dto/pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async createAnimal(data: PetDto, userId: string): Promise<Pets> {
    const { name, type, logo, status, image } = data;
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new HttpException(`no user`, HttpStatus.NOT_FOUND);
    }
    return this.prismaService.pets.create({
      data: {
        name,
        type,
        // logo,
        status,
        // image,
        ownerId: user.id,
      },
    });
  }

  async updateAnimal(data: any) {
    return this.prismaService.pets.create({
      data: {
        name: data.name,
        type: data.type,
        // logo,
        status: data.status,
        // image,
        ownerId: data.ownerId,
      },
    });
  }
}

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
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async createAnimal(data: PetDto, userId: string): Promise<Pets> {
    const { name, type, status, logo, image } = data;
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new HttpException(`no user`, HttpStatus.NOT_FOUND);
    }

    return this.prismaService.pets.create({
      data: {
        name,
        status,
        type,
        image,
        logo,
        ownerId: userId,
      },
    });
  }

  async updateAnimal(data: any, petId: string) {
    return this.prismaService.pets.update({
      where: { id: +petId },
      data: {
        name: data.name,
        type: data.type,
        logo: data.logo,
        status: data.status,
        image: data.image,
      },
    });
  }
}

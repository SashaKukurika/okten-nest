import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../core/orm/prisma.service';
import { PetDto } from '../pets/dto/pet.dto';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUserList(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  public async getUserById(userId: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: { id: userId },
      // include: {
      //   pets: true,
      // },
    });
  }

  // public async getUserInfo(userId: string) {
  //   return this.prismaService.user.findFirst({
  //     where: { id: Number(userId) },
  //     select: {
  //       name: true,
  //       city: true,
  //       age: true,
  //     },
  //   });
  // }
  public async createUser(userDate: CreateUserDto): Promise<User> {
    const { city, name, status, age, email, avatar } = userDate;

    return this.prismaService.user.create({
      data: {
        name,
        email,
        age,
        city,
        status,
        avatar,
      },
    });
  }

  public async updateUser(userDate: User, userId: string) {
    const { city, name, status, age } = userDate;
    return this.prismaService.user.update({
      where: { id: userId },
      data: { name, status, age, city },
    });
  }

  public async deleteUser(userId: string) {
    return this.prismaService.user.delete({ where: { id: userId } });
  }

  public async createPet(petData: PetDto, userId: string): Promise<PetDto> {
    const { type, name, status } = petData;

    return this.prismaService.pets.create({
      data: {
        name,
        status,
        type,
        ownerId: userId,
      },
    });
  }

  public async findByUserName(username: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: { email: username },
    });
  }
}

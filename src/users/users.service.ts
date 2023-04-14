import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../core/orm/prisma.service';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private users: any = []; //todo delete
  constructor(private readonly prismaService: PrismaService) {}

  public async getUserList() {
    return this.users;
  }

  public async getUserById(userId: string) {
    return this.users.find((user) => user.userId === userId);
  }
  public async createUser(userDate: CreateUserDto): Promise<User> {
    const { city, name, status, age, email } = userDate;

    return this.prismaService.user.create({
      data: {
        name,
        email,
        age,
        city,
        status,
      },
    });
  }

  public async updateUser(userDate: CreateUserDto, userId: string) {
    const index = this.users.findIndex((user) => user.userId === userId);
    this.users[index] = { ...userDate, userId };

    return this.users[index];
  }

  public async deleteUser(userId: string) {
    const index = this.users.findIndex((user) => user.userId === userId);

    return this.users.splice(index, 1);
  }
}

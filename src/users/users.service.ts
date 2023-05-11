import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../core/orm/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUserList(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  public async createUser(userData: User): Promise<User> {
    const { name, email } = userData;
    return this.prismaService.user.create({ data: { name, email } });
  }
}

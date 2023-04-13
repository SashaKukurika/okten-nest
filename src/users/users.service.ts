import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private users: any = [];

  public async getUserList() {
    return this.users;
  }

  public async getUserById(userId: string) {
    return this.users.find((user) => user.userId === userId);
  }
  public async createUser(userDate: CreateUserDto) {
    this.users.push({ ...userDate, userId: v4() });

    return this.users;
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

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private users: any = [];
  public async createUser(userDate: CreateUserDto) {
    this.users.push(userDate);
    return this.users;
  }
}

import { Module } from '@nestjs/common';

import { PrismaService } from '../core/orm/prisma.service';
import { PetsModule } from '../pets/pets.module';
import { PetsService } from '../pets/pets.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PetsModule],
  controllers: [UsersController],
  providers: [PetsService, UsersService, PrismaService],
})
export class UsersModule {}

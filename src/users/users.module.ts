import { forwardRef, Module } from '@nestjs/common';

import { PrismaService } from '../core/orm/prisma.service';
import { PetsModule } from '../pets/pets.module';
import { PetsService } from '../pets/pets.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [forwardRef(() => PetsModule)],
  controllers: [UsersController],
  providers: [PrismaService, PetsService, UsersService],
})
export class UsersModule {}

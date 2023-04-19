import { forwardRef, Module } from '@nestjs/common';

import { PrismaService } from '../core/orm/prisma.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [PetsService, UsersService, PrismaService],
  controllers: [PetsController],
  exports: [PetsService],
})
export class PetsModule {}

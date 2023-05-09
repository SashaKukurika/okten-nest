import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { PrismaService } from './core/orm/prisma.service';
import { PetsModule } from './pets/pets.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, PetsModule, AuthModule, CoreModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, PrismaService],
})
export class AppModule {}

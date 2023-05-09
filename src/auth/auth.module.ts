import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { CoreModule } from '../core/core.module';
import { MailService } from '../core/mail/mail.service';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [
    UsersModule,
    CoreModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    BearerStrategy,
    UsersService,
    PrismaService,
    MailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}

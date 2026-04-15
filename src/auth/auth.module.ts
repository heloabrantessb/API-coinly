import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
dotenv.config()

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: (process.env.EXPIRESIN ?? '7d') as `${number}${'d' | 'h' | 'm' | 's' | 'w' | 'y'}`,
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
  ],
  exports: []
})
export class AuthModule {}

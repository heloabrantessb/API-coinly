import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import dotenv from 'dotenv';
dotenv.config()

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: (process.env.EXPIRESIN ?? '7d') as `${number}${'d' | 'h' | 'm' | 's' | 'w' | 'y'}`,
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: []
})
export class AuthModule {}

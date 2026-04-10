import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(login: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByEmail(login);

        if (user?.passwordHash !== pass) throw new UnauthorizedException();
        
        const payload = { sub: user.id, username: user.email }

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}

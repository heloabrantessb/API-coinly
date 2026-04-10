import { IsNotEmpty } from 'class-validator';
import type { Role } from '../../../generated/prisma/enums'

export class RegisterUserDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() lastName: string;
    @IsNotEmpty() email: string;
    @IsNotEmpty() password: string;
    @IsNotEmpty() role: Role;
}
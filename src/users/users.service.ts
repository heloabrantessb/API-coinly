import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: RegisterUserDto) {
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { email: userDto.email },
    });

    if (userAlreadyExists) {
      throw new ConflictException('Este email ja esta sendo utilizado');
    }

    const hashedPassword = await hash(userDto.password, 10);

    return this.prisma.user.create({
      data: {
        name: userDto.name,
        lastName: userDto.lastName,
        email: userDto.email,
        passwordHash: hashedPassword,
        role: userDto.role,
      },
      select: {
        passwordHash: false
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

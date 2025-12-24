import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
      },
    });
  }

  async validateUser(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) return null;

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) return null;

    return user;
  }
}

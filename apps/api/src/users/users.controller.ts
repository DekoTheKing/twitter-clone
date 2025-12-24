import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const user = await this.usersService.validateUser(dto);
    if (!user) return { message: 'Invalid credentials' };
    return { message: 'Login successful', user };
  }
}

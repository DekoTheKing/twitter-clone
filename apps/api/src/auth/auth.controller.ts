import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const token = await this.authService.login(dto);
    if (!token) return { message: 'Invalid credentials' };
    return token;
  }
}

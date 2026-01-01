import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  postsService: any;
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const token = await this.authService.login(dto);
    if (!token) return { message: 'Invalid credentials' };
    return token;
  }
  @UseGuards(AuthGuard('jwt'))
@Post()
create(@Req() req, @Body() dto: CreatePostDto) {
  console.log('USER:', req.user); // 👈 ADD THIS
  return this.postsService.create(req.user.sub, dto);
}
}

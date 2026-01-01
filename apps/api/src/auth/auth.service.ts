import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(dto: LoginUserDto) {
    const user = await this.usersService.validateUser(dto);
    if (!user) return null;
    return user;
  }

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    if (!user) return null;

    const payload = { sub: user.id }; // removed username
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

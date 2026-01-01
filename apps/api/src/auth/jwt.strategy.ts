import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'default_secret', // fallback if not defined
    });

    if (!process.env.JWT_SECRET) {
      console.warn('Warning: JWT_SECRET is not defined. Using default secret!');
    }
  }

  async validate(payload: any) {
    // return the user info stored in the token
    return { userId: payload.sub, email: payload.email }; // adjust to your JWT payload
  }
}

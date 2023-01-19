import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  login(password: string): string {
    const isAdmin = process.env.ADMIN_PASSWORD === password;
    const isUser = process.env.PASSWORD === password;
    if (isUser || isAdmin) {
      const token = this.jwtService.sign(
        { isAdmin: isAdmin },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '12h',
        },
      );
      return token;
    }
    return null;
  }
  async validateToken(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}

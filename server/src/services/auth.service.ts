import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginServRes } from 'src/interfaces/service-res.interfaces';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  login(password: string): LoginServRes {
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
      return { token, isAdmin };
    }
    throw new BadRequestException({ message: 'Incorect password!' });
  }

  generateToken() {
    const token = this.jwtService.sign(
      {},
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '30s',
      },
    );
    return { token };
  }

  async checkAuth(token: string): Promise<LoginServRes> {
    try {
      const { isAdmin } = await this.validateToken(token);
      return { token, isAdmin };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  async validateToken(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}

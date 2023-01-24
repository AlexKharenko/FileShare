import {
  Controller,
  Request,
  Response,
  Post,
  Get,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { LoginRes } from 'src/interfaces/auth.interfaces';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  login(@Request() req, @Response({ passthrough: true }) res): LoginRes {
    const { token, isAdmin } = this.authService.login(req.body.password);
    if (token === null) {
      res.setCookie('token', '', {
        httpOnly: true,
        path: '/',
        expires: Date.now(),
      });
      return { success: false, message: 'Password incorrect!' };
    }
    res.setCookie('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 12 * 60 * 60,
    });
    return { success: true, isAdmin };
  }

  @UseGuards(AuthGuard)
  @Get('auth/download')
  getDownloadToken() {
    const { token } = this.authService.generateToken();
    if (token === null) {
      throw new BadRequestException();
    }

    return { success: true, token };
  }

  @Get('auth/check')
  async checkAuth(@Request() req): Promise<LoginRes> {
    const { token } = req?.cookies;
    const { isAdmin } = await this.authService.checkAuth(token);
    return { success: true, isAdmin };
  }

  @Post('auth/logout')
  logout(@Response({ passthrough: true }) res) {
    res.setCookie('token', '', { httpOnly: true, path: '/', maxAge: 0 });
    return { success: true };
  }
}

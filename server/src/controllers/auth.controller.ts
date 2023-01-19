import { Controller, Request, Response, Post } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

interface SRes {
  success: boolean;
  message?: string;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  login(@Request() req, @Response({ passthrough: true }) res): SRes {
    const token = this.authService.login(req.body.password);
    if (token === null) {
      res.setCookie('token', '', {
        httpOnly: true,
        path: '/',
        expires: Date.now(),
      });
      return { success: false, message: 'Password incorrect!' };
    }
    res.setCookie('token', token, { httpOnly: true, path: '/' });
    return { success: true };
  }
}

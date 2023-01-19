import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { token } = req?.cookies;
    if (token) {
      const result = await this.validate(token);
      if (result) {
        req.isAdmin = result.isAdmin;
        return true;
      }
    }
    throw new UnauthorizedException();
  }
  async validate(token: string) {
    try {
      return await this.authService.validateToken(token);
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}

import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class DownloadGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { token } = req?.query;
    if (token) {
      const result = await this.validate(token);
      if (result) {
        return true;
      }
    }
    return false;
  }
  async validate(token: string) {
    try {
      return await this.authService.validateToken(token);
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}

import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller()
export class AppController {
  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  login(@Request() req): string {
    return req?.cookies?.token || 'No token';
  }
}

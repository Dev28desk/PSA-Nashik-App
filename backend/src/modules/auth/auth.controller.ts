

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  async sendOTP(@Body('phone') phone: string) {
    return this.authService.sendOTP(phone);
  }

  @Post('verify-otp')
  async verifyOTP(@Body('phone') phone: string, @Body('otp') otp: string) {
    return this.authService.verifyOTP(phone, otp);
  }
}


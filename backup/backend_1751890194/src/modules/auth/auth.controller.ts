import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  async sendOTP(@Body() body: { phone: string }, @Res() res: Response) {
    const result = await this.authService.sendOTP(body.phone);
    res.json(result);
  }

  @Post('verify-otp')
  async verifyOTP(@Body() body: { phone: string; otp: string }, @Res() res: Response) {
    const result = await this.authService.verifyOTP(body.phone, body.otp);
    res.json(result);
  }
}

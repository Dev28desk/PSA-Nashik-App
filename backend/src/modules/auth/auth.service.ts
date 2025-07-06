


import { Injectable } from '@nestjs/common';
import { generateOTP, verifyOTP as validateOTP } from './otp.service';
import { createJWT } from './jwt.service';

@Injectable()
export class AuthService {
  async sendOTP(phone: string) {
    try {
      const otp = await generateOTP(phone);
      // TODO: Integrate with SMS service
      return { success: true, message: 'OTP sent' };
    } catch (error) {
      throw new Error('Failed to send OTP');
    }
  }

  async verifyOTP(phone: string, otp: string) {
    try {
      const isValid = await validateOTP(phone, otp);
      if (!isValid) {
        throw new Error('Invalid OTP');
      }
      const token = createJWT(phone);
      return { token };
    } catch (error) {
      throw new Error('Verification failed');
    }
  }
}



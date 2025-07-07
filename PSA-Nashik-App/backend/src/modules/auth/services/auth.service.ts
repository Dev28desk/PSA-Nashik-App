

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../entities/user.entity';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService
  ) {}

  async validateUser(phone: string, otp: string): Promise<User | null> {
    const storedOtp = await this.redisService.get(`otp:${phone}`);
    if (storedOtp !== otp) return null;
    
    // In a real implementation, fetch user from database
    return { 
      id: 1, 
      phone,
      otpSecret: '',
      isVerified: true,
      createdAt: new Date()
    } as User;
  }

  async generateToken(user: User) {
    const payload = { 
      sub: user.id, 
      phone: user.phone 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


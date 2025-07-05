

import { authenticator } from 'otplib';
import redisClient from '../../services/redis';

const OTP_EXPIRY = 300; // 5 minutes in seconds

export const generateOTP = async (phone: string): Promise<string> => {
  const otp = authenticator.generate(process.env.OTP_SECRET! + phone);
  await redisClient.set(`otp:${phone}`, otp, 'EX', OTP_EXPIRY);
  return otp;
};

export const verifyOTP = async (phone: string, otp: string): Promise<boolean> => {
  const storedOTP = await redisClient.get(`otp:${phone}`);
  if (!storedOTP) return false;
  
  return authenticator.verify({
    secret: process.env.OTP_SECRET! + phone,
    token: otp
  });
};




import { Request, Response, NextFunction } from 'express';
import { SendOTPRequest, VerifyOTPRequest } from '../types/auth';

export const validateSendOTP = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone } = req.body as SendOTPRequest;
  if (!phone || phone.length < 10) {
    return res.status(400).json({ error: 'Valid phone number required' });
  }
  next();
};

export const validateVerifyOTP = (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  const { phone, otp } = req.body as VerifyOTPRequest;
  if (!phone || !otp || otp.length !== 6) {
    return res.status(400).json({ error: 'Phone and 6-digit OTP required' });
  }
  next();
};


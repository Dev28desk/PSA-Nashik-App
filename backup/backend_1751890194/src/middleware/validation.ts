

import { Request, Response, NextFunction } from 'express';
import { SendOTPRequest, VerifyOTPRequest } from '../types/auth';

export const validateSendOTP = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { phone } = req.body as SendOTPRequest;
  if (!phone || phone.length < 10) {
    res.status(400).json({ error: 'Valid phone number required' });
    return;
  }
  next();
};

export const validateVerifyOTP = (
  req: Request,
  res: Response, 
  next: NextFunction
): void => {
  const { phone, otp } = req.body as VerifyOTPRequest;
  if (!phone || !otp || otp.length !== 6) {
    res.status(400).json({ error: 'Phone and 6-digit OTP required' });
    return;
  }
  next();
};


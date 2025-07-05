
import { Request, Response } from 'express';
import { generateOTP, verifyOTP } from './otp.service';
import { createJWT } from './jwt.service';

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    const otp = await generateOTP(phone);
    // TODO: Integrate with SMS service
    return res.status(200).json({ success: true, message: 'OTP sent' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;
    const isValid = await verifyOTP(phone, otp);
    
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    const token = createJWT(phone);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Verification failed' });
  }
};

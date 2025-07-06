

import { Router } from 'express';
import { sendOTP, verifyOTP } from './auth.controller';
import { 
  validateSendOTP,
  validateVerifyOTP 
} from '../../middleware/validation';

const router = Router();

router.post('/send-otp', validateSendOTP, sendOTP);
router.post('/verify-otp', validateVerifyOTP, verifyOTP);

export default router;


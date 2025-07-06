import { AuthService } from './auth.service';
const controller = new AuthController(new AuthService());


import { Router } from 'express';
import { AuthController } from './auth.controller';
import { 
  validateSendOTP,
  validateVerifyOTP 
} from '../../middleware/validation';

const router = Router();


export default router;


router.post('/send-otp', validateSendOTP, (req, res, next) => 
  controller.sendOTP(req.body, res)
);

router.post('/verify-otp', validateVerifyOTP, (req, res, next) => 
  controller.verifyOTP(req.body, res)
);

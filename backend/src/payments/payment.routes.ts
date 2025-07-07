

import { Router } from 'express';
import { createOrder, verifyPayment } from './payment.controller';

const router = Router();

// Payment routes
router.post('/payments/create-order', createOrder);
router.post('/payments/verify', verifyPayment);

export default router;


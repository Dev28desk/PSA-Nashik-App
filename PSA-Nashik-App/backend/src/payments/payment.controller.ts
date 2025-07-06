
import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { validatePaymentRequest } from './payment.validator';

interface PaymentOrder {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { error } = validatePaymentRequest(req.body);
    if (error) return res.status(400).json({ success: false, error: error.message });

    const orderOptions: PaymentOrder = {
      amount: req.body.amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        studentId: req.body.studentId,
        purpose: 'Monthly Fee'
      }
    };

    const order = await razorpay.orders.create(orderOptions);
    res.json({ 
      success: true, 
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Payment initiation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  
  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }

    // Save to database (implementation depends on your DB setup)
    // await saveSuccessfulPayment(orderId, paymentId);
    
    res.json({ 
      success: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    });
  } catch (error) {
    console.error('Payment verification failed:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Payment verification failed' 
    });
  }
};

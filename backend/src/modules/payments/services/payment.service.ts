


import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Injectable()
export class PaymentService {
  private razorpay: Razorpay;

  constructor(private configService: ConfigService) {
    this.razorpay = new Razorpay({
      key_id: this.configService.get('razorpay.keyId'),
      key_secret: this.configService.get('razorpay.keySecret'),
    });
  }

  async createOrder(createPaymentDto: CreatePaymentDto) {
    const options = {
      amount: createPaymentDto.amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: createPaymentDto.notes
    };

    try {
      const order = await this.razorpay.orders.create(options);
      return {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      };
    } catch (err) {
      throw new Error(`Payment failed: ${err.error.description}`);
    }
  }

  async verifyWebhookSignature(body: any, signature: string) {
    const webhookSecret = this.configService.get('razorpay.webhookSecret');
    return this.razorpay.webhooks.verify(body, signature, webhookSecret);
  }
}



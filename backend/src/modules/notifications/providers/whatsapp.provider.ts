


import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WhatsAppProvider {
  private apiUrl: string;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = this.configService.get('WHATSAPP_API_URL');
    this.apiKey = this.configService.get('WHATSAPP_API_KEY');
  }

  async sendMessage(phone: string, template: string, params: string[] = []) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/messages`,
        {
          phone: phone.replace('+', ''),
          template,
          params
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`WhatsApp message failed: ${error.response?.data?.error || error.message}`);
    }
  }

  async sendOTP(phone: string, otp: string) {
    return this.sendMessage(phone, 'otp_template', [otp]);
  }
}



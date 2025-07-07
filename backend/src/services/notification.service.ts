
import axios from 'axios';
import { config } from '../config';

interface WhatsAppMessage {
  phone: string;
  template: string;
  variables?: Record<string, string>;
}

/**
 * Handles all notification delivery mechanisms
 */
export class NotificationService {
  private static whatsappEnabled = config.whatsapp.enabled;

  /**
   * Sends a WhatsApp notification using template messages
   * @param message - Contains phone, template name and optional variables
   * @returns Promise resolving to true if sent successfully, false otherwise
   * @throws Logs errors to console but doesn't throw externally
   */
  static async sendWhatsApp(message: WhatsAppMessage): Promise<boolean> {
    if (!this.whatsappEnabled) return false;

    try {
      const response = await axios.post(config.whatsapp.endpoint, {
        messaging_product: 'whatsapp',
        to: message.phone,
        type: 'template',
        template: {
          name: message.template,
          language: { code: 'en_US' },
          components: message.variables ? [
            {
              type: 'body',
              parameters: Object.entries(message.variables).map(([key, value]) => ({
                type: 'text',
                text: value
              }))
            }
          ] : undefined
        }
      });
      return response.status === 200;
    } catch (error) {
      console.error('WhatsApp notification failed:', error);
      return false;
    }
  }
}

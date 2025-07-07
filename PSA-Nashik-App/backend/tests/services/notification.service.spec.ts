

import { NotificationService } from '../../src/services/notification.service';
import axios from 'axios';
import { config } from '../../src/config';

jest.mock('axios');
jest.mock('../../src/config');

describe('NotificationService', () => {
  const mockConfig = {
    whatsapp: {
      enabled: true,
      endpoint: 'https://whatsapp.example.com'
    }
  };

  beforeAll(() => {
    console.log('Applying mock config...');
    (config as any) = mockConfig;
    // Ensure static property is set
    NotificationService['whatsappEnabled'] = mockConfig.whatsapp.enabled;
    console.log('Service whatsappEnabled:', NotificationService['whatsappEnabled']);
  });

  describe('sendWhatsApp', () => {
    it('should successfully send WhatsApp notifications', async () => {
      console.log('Running successful notification test...');
      
      const mockPost = (axios.post as jest.Mock).mockImplementation(() => {
        console.log('Mock axios.post called');
        return Promise.resolve({
          status: 200,
          statusText: 'OK',
          data: { success: true }
        });
      });

      console.log('Current config:', config);
      
      const result = await NotificationService.sendWhatsApp({
        phone: '+1234567890',
        template: 'test_template'
      });

      console.log('Axios call args:', mockPost.mock.calls[0]);
      console.log('Test result:', result);
      
      expect(result).toBeTruthy();
    });

    it('should handle WhatsApp notification failures', async () => {
      const mockError = new Error('Failed');
      (axios.post as jest.Mock).mockRejectedValue(mockError);
      const consoleSpy = jest.spyOn(console, 'error');
      
      const result = await NotificationService.sendWhatsApp({
        phone: '+1234567890', 
        template: 'test_template'
      });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'WhatsApp notification failed:', 
        mockError
      );
      expect(result).toBeFalsy();
    });

    it('should return false when WhatsApp is disabled', async () => {
      (config as any).whatsapp.enabled = false;
      const result = await NotificationService.sendWhatsApp({
        phone: '+1234567890',
        template: 'test_template'
      });
      expect(result).toBeFalsy();
    });
  });
});




import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';

export class NotificationController {
  static async sendWhatsApp(req: Request, res: Response) {
    try {
      const { phone, template, variables } = req.body;
      const success = await NotificationService.sendWhatsApp({
        phone,
        template,
        variables
      });
      
      return res.status(200).json({ 
        success,
        message: success ? 'Notification sent' : 'Notification failed'
      });
    } catch (error) {
      console.error('Notification error:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  }
}


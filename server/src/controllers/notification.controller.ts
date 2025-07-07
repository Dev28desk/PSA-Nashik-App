


import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';
import { NotificationRepository } from '../repositories/notification.repository';
import { 
  NotificationChannel,
  NotificationTemplate,
  UserNotificationPreference
} from '../types/notifications';

export class NotificationController {
  private notificationService = NotificationService.getInstance();
  private notificationRepo = new NotificationRepository();

  async sendNotification(req: Request, res: Response) {
    try {
      const { userId, templateId, channel, customData } = req.body;
      
      // Validate request
      if (!userId || !templateId || !channel) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Get user preferences (to be implemented)
      const userPrefs = await this.getUserPreferences(userId);
      
      // Check channel permission
      if (!this.isChannelEnabled(channel, userPrefs)) {
        return res.status(403).json({ error: 'Channel disabled by user' });
      }

      // Get template (to be implemented)
      const template = await this.getTemplate(templateId);

      // Send notification
      const success = await this.notificationService.send({
        userId,
        type: channel,
        title: template.defaultTitle,
        body: template.defaultBody,
        metadata: customData
      });

      return success 
        ? res.json({ success: true })
        : res.status(500).json({ error: 'Failed to send notification' });
        
    } catch (error) {
      console.error('Notification error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  private async getUserPreferences(userId: string): Promise<UserNotificationPreference> {
    const prefs = await this.notificationRepo.getPreferences(userId);
    if (!prefs) {
      throw new Error(`Preferences not found for user ${userId}`);
    }
    return prefs;
  }

  private async getTemplate(templateId: string): Promise<NotificationTemplate> {
    const template = await this.notificationRepo.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }
    return template;
  }

  private isChannelEnabled(
    channel: NotificationChannel,
    prefs: UserNotificationPreference
  ): boolean {
    switch (channel) {
      case 'email': return prefs.emailEnabled;
      case 'sms': return prefs.smsEnabled;
      case 'push': return prefs.pushEnabled;
    }
  }

  async updatePreferences(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const updates = req.body;
      
      await this.notificationRepo.updatePreferences(userId, updates);
      return res.json({ success: true });
    } catch (error) {
      console.error('Update preferences error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}



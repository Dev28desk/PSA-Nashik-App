

import { Request, Response, NextFunction } from 'express';
import { NotificationChannel } from '../types/notifications';

export const validateNotificationRequest = (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  const { userId, templateId, channel } = req.body;

  // Validate required fields
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  if (!templateId) {
    return res.status(400).json({ error: 'templateId is required' }); 
  }
  if (!channel) {
    return res.status(400).json({ error: 'channel is required' });
  }

  // Validate channel type
  const validChannels: NotificationChannel[] = ['email', 'sms', 'push'];
  if (!validChannels.includes(channel)) {
    return res.status(400).json({
      error: `Invalid channel. Must be one of: ${validChannels.join(', ')}`
    });
  }

  next();
};

export const validatePreferences = (
  req: Request,
  res: Response,
  next: NextFunction  
) => {
  const { emailEnabled, smsEnabled, pushEnabled } = req.body;

  if (typeof emailEnabled !== 'boolean') {
    return res.status(400).json({ error: 'emailEnabled must be boolean' });
  }
  if (typeof smsEnabled !== 'boolean') {
    return res.status(400).json({ error: 'smsEnabled must be boolean' });
  }
  if (typeof pushEnabled !== 'boolean') {
    return res.status(400).json({ error: 'pushEnabled must be boolean' });
  }

  next();
};


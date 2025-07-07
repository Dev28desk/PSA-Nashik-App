


export type NotificationChannel = 'email' | 'sms' | 'push';

export interface NotificationTemplate {
  id: string;
  name: string;
  defaultTitle: string;
  defaultBody: string;
  allowedChannels: NotificationChannel[];
}

export interface UserNotificationPreference {
  userId: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  unsubscribedTemplates: string[];
}

export interface NotificationLog {
  notificationId: string;
  userId: string;
  channel: NotificationChannel;
  templateId?: string;
  sentAt: Date;
  status: 'pending' | 'delivered' | 'failed';
  error?: string;
}



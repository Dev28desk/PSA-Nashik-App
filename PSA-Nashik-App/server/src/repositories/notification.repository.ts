


import { db } from '../firebase';
import { 
  UserNotificationPreference,
  NotificationTemplate,
  NotificationLog 
} from '../types/notifications';

export class NotificationRepository {
  private readonly preferencesRef = db.collection('notificationPreferences');
  private readonly templatesRef = db.collection('notificationTemplates');
  private readonly logsRef = db.collection('notificationLogs');

  async getPreferences(userId: string): Promise<UserNotificationPreference | null> {
    const doc = await this.preferencesRef.doc(userId).get();
    return doc.exists ? doc.data() as UserNotificationPreference : null;
  }

  async updatePreferences(
    userId: string,
    updates: Partial<UserNotificationPreference>
  ): Promise<void> {
    await this.preferencesRef.doc(userId).set(updates, { merge: true });
  }

  async getTemplate(templateId: string): Promise<NotificationTemplate | null> {
    const doc = await this.templatesRef.doc(templateId).get();
    return doc.exists ? doc.data() as NotificationTemplate : null;
  }

  async logNotification(
    entry: Omit<NotificationLog, 'notificationId'>
  ): Promise<string> {
    const ref = await this.logsRef.add(entry);
    return ref.id;
  }

  async getNotificationHistory(
    userId: string,
    limit = 50
  ): Promise<NotificationLog[]> {
    const snapshot = await this.logsRef
      .where('userId', '==', userId)
      .orderBy('sentAt', 'desc')
      .limit(limit)
      .get();
      
    return snapshot.docs.map(doc => ({
      notificationId: doc.id,
      ...doc.data()
    })) as NotificationLog[];
  }
}






import admin from 'firebase-admin';
import twilio from 'twilio';
import nodemailer from 'nodemailer';
import { WebSocketService } from './websocket.service';

interface NotificationPayload {
  userId: string;
  type: 'email' | 'sms' | 'push';
  title: string;
  body: string;
  metadata?: Record<string, any>;
}

export class NotificationService {
  private static instance: NotificationService;
  private twilioClient: twilio.Twilio;
  private mailTransport: nodemailer.Transporter;
  private webSocketService: WebSocketService;

  private constructor() {
    // Initialize services
    this.twilioClient = twilio(
      process.env.TWILIO_SID, 
      process.env.TWILIO_AUTH_TOKEN
    );
    this.mailTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    // Initialize Firebase if not already initialized
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)
        )
      });
    }
    
    // Initialize WebSocket service
    this.webSocketService = WebSocketService.getInstance();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async send(payload: NotificationPayload): Promise<boolean> {
    try {
      let success: boolean;
      switch (payload.type) {
        case 'email':
          success = await this.sendEmail(payload);
          break;
        case 'sms':
          success = await this.sendSMS(payload);
          break;
        case 'push':
          success = await this.sendPush(payload);
          break;
      }
      
      // Send real-time notification via WebSocket if available
      if (success) {
        this.webSocketService.sendNotification(
          payload.userId,
          {
            type: payload.type,
            title: payload.title,
            body: payload.body,
            timestamp: new Date().toISOString()
          }
        );
      }
      return success;
    } catch (error) {
      console.error('Notification failed:', error);
      return false;
    }
  }

  private async sendEmail(payload: NotificationPayload): Promise<boolean> {
    try {
      await this.mailTransport.sendMail({
        from: process.env.EMAIL_FROM,
        to: await this.getUserEmail(payload.userId),
        subject: payload.title,
        text: payload.body,
        html: `<p>${payload.body}</p>`
      });
      return true;
    } catch (error) {
      console.error('Email notification failed:', error);
      return false;
    }
  }

  private async getUserEmail(userId: string): Promise<string> {
    // TODO: Implement user email lookup
    return `${userId}@example.com`;
  }

  private async sendSMS(payload: NotificationPayload): Promise<boolean> {
    try {
      await this.twilioClient.messages.create({
        body: `${payload.title}: ${payload.body}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: await this.getUserPhoneNumber(payload.userId)
      });
      return true;
    } catch (error) {
      console.error('SMS notification failed:', error);
      return false;
    }
  }

  private async getUserPhoneNumber(userId: string): Promise<string> {
    // TODO: Implement user phone number lookup
    return '+15551234567'; // Default US number format
  }

  private async sendPush(payload: NotificationPayload): Promise<boolean> {


  private async sendPush(payload: NotificationPayload): Promise<boolean> {
    try {
      const deviceToken = await this.getUserDeviceToken(payload.userId);
      
      if (!deviceToken.match(/^[a-zA-Z0-9_: -]+$/)) {
        throw new Error('Invalid FCM token format');
      }

      const message = {
        token: deviceToken,
        notification: {
          title: payload.title,
          body: payload.body
        },
        data: payload.metadata || {},
        android: { priority: 'high' },
        apns: { payload: { aps: { 'mutable-content': 1 } } 
      };

      const response = await admin.messaging().send(message);
      await this.logDelivery(payload.userId, 'push', response);
      return true;
    } catch (error) {
      console.error('Push notification failed:', error);
      await this.logFailure(payload.userId, 'push', error);
      return false;
    }
  }

  private async getUserDeviceToken(userId: string): Promise<string> {
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(userId)
      .get();
      
    if (!userDoc.exists) {
      throw new Error(`User ${userId} not found`);
    }
    
    const token = userDoc.data()?.fcmToken;
    if (!token) {
      throw new Error(`No FCM token found for user ${userId}`);
    }
    
    return token;
  }


    // Implementation will be added
    return true;
  }
}



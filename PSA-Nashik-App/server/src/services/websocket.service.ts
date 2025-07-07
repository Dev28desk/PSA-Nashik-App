

import { WebSocketServer } from 'ws';
import { Notification } from '../types/notifications';

export class WebSocketService {
  private static instance: WebSocketService;
  private wss: WebSocketServer;
  private connections: Map<string, WebSocket> = new Map();

  private constructor(port: number) {
    this.wss = new WebSocketServer({ port });
    this.setupEventHandlers();
  }

  public static getInstance(port = 8080): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(port);
    }
    return WebSocketService.instance;
  }

  private setupEventHandlers() {
    this.wss.on('connection', (ws, req) => {
      const userId = this.extractUserIdFromRequest(req);
      if (userId) {
        this.connections.set(userId, ws);
        ws.on('close', () => this.connections.delete(userId));
      }
    });
  }

  public sendNotification(userId: string, notification: Notification): boolean {
    const connection = this.connections.get(userId);
    if (connection && connection.readyState === 1) {
      connection.send(JSON.stringify(notification));
      return true;
    }
    return false;
  }

  private extractUserIdFromRequest(req: Request): string | null {
    // Extract from auth token or query params
    return req.url?.split('userId=')[1] || null;
  }
}


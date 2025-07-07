

import { Module } from '@nestjs/common';
import { notificationRoutes } from './notification.routes';
import { NotificationController } from '../../controllers/notification.controller';
import { NotificationService } from '../../services/notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}


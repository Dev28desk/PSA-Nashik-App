


import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { 
  validateNotificationRequest,
  validatePreferences 
} from '../middleware/notification.middleware';

const router = Router();
const notificationController = new NotificationController();

// Notification endpoints
router.post(
  '/send',
  validateNotificationRequest,
  notificationController.sendNotification.bind(notificationController)
);

// Preference management
router.get(
  '/preferences/:userId',
  notificationController.getUserPreferences.bind(notificationController)  
);

router.put(
  '/preferences/:userId',
  validatePreferences,
  notificationController.updatePreferences.bind(notificationController)
);

// Notification history
router.get(
  '/history/:userId',
  notificationController.getNotificationHistory.bind(notificationController)
);

export default router;



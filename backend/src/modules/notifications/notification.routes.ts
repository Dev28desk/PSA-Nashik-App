
import { Router } from 'express';
import { NotificationController } from '../../controllers/notification.controller';
import { validateRequest } from '../../middlewares/validation.middleware';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/whatsapp',
  [
    body('phone').isMobilePhone('any'),
    body('template').isString().notEmpty(),
    body('variables').optional().isObject()
  ],
  validateRequest,
  NotificationController.sendWhatsApp
);

export { router as notificationRoutes };

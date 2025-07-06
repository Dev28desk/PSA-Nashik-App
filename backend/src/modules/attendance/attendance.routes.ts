


import { Router } from 'express';
import { DataSource } from 'typeorm';
import { AttendanceController } from './attendance.controller';
import { authenticate } from '../../middleware/auth.middleware';

export const createAttendanceRoutes = (dataSource: DataSource): Router => {
  const router = Router();
  const controller = new AttendanceController(dataSource);

  router.post('/', authenticate('coach'), controller.markAttendance);
  router.get('/student/:studentId', authenticate(), controller.getStudentAttendance);
  router.get('/batch/:batchId', authenticate(), controller.getBatchAttendance);
  router.get('/streak/:studentId', authenticate(), controller.getAttendanceStreak);

  return router;
};



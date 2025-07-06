import { AppDataSource } from '../../data-source';
import { Attendance } from './attendance.entity';



import { Router } from 'express';
import { DataSource } from 'typeorm';
import { AttendanceController } from './attendance.controller';
import { authenticate } from '../../middleware/auth.middleware';

export const createAttendanceRoutes = (dataSource: DataSource): Router => {
  const router = Router();
  const controller = new AttendanceController(AppDataSource.getRepository(Attendance));

    router.post('/', authenticate('coach'), (req, res, next) => {
    controller.markAttendance(req, res, next);
  });
  router.get('/student/:studentId', authenticate(), (req, res, next) => controller.getStudentAttendance(req, res, next));
  router.get('/batch/:batchId', authenticate(), (req, res, next) => controller.getBatchAttendance(req, res, next));
  router.get('/streak/:studentId', authenticate(), (req, res, next) => controller.getAttendanceStreak(req, res, next));

  return router;
};





import { Router } from 'express';
import { StudentController } from './student.controller';

const router = Router();
const controller = new StudentController();

// Student CRUD endpoints
router.post('/', controller.createStudent);
router.get('/', controller.getAllStudents);
router.get('/:id', controller.getStudentById);
router.put('/:id', controller.updateStudent);
router.delete('/:id', controller.deleteStudent);

// Specialized student endpoints
router.get('/sport/:sportId', controller.getStudentsBySport);
router.get('/batch/:batchId', controller.getStudentsByBatch);

export const studentRouter = router;


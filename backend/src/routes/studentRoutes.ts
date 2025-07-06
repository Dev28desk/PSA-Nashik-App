import { Router } from 'express';
import { StudentController } from '../controllers/StudentController';

const router = Router();
const studentController = new StudentController();

router.post('/students', studentController.createStudent);
router.get('/students/:id', studentController.getStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

export default router;

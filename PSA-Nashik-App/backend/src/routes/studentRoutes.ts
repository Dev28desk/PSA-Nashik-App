import { Router } from 'express';
import { StudentController } from '../controllers/StudentController';
import { StudentService } from '../services/StudentService';
import { StudentRepository } from '../repositories/StudentRepository';

const router = Router();
const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

router.post('/students', (req, res) => studentController.create(req, res));
router.get('/students/:id', (req, res) => studentController.getById(req, res));
router.put('/students/:id', (req, res) => studentController.update(req, res));
router.delete('/students/:id', (req, res) => studentController.delete(req, res));

export default router;

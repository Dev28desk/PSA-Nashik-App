import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';

export class StudentController {
  constructor(private studentService: StudentService) {}

  async create(req: Request, res: Response) {
    try {
      const student = await this.studentService.create(req.body);
      res.status(201).json(student);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const student = await this.studentService.findByPhone(req.params.id);
      student ? res.json(student) : res.status(404).end();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const student = await this.studentService.create({
        ...req.body,
        id: parseInt(req.params.id)
      });
      res.json(student);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.studentService.delete(parseInt(req.params.id));
      res.status(204).end();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

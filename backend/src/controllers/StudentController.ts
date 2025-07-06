


import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';
import { Student } from '../entities/Student';

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  async createStudent(req: Request, res: Response) {
    try {
      const student = await this.studentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async getStudent(req: Request, res: Response) {
    try {
      const student = await this.studentService.getStudentById(parseInt(req.params.id));
      if (student) {
        res.json(student);
      } else {
        res.status(404).json({ error: 'Student not found' });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async updateStudent(req: Request, res: Response) {
    try {
      const student = await this.studentService.updateStudent(
        parseInt(req.params.id),
        req.body
      );
      res.json(student);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async deleteStudent(req: Request, res: Response) {
    try {
      await this.studentService.deleteStudent(parseInt(req.params.id));
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}



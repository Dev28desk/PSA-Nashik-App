


import { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { StudentRepository } from './repositories/student.repository';
import { Student } from './student.model';
import { 
  createStudentSchema,
  updateStudentSchema,
  studentIdSchema,
  sportIdSchema,
  batchIdSchema
} from './student.validations';

export class StudentController {
  private repository: StudentRepository;

  constructor(dataSource: DataSource) {
    this.repository = new StudentRepository(dataSource);
  }

  async createStudent(req: Request, res: Response): Promise<void> {
    try {
      const { error } = createStudentSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);

      const student = await this.repository.save(req.body);
      res.status(201).json(student);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Failed to create student';
      res.status(400).json({ error: errMsg });
    }
  }

  async getAllStudents(req: Request, res: Response): Promise<void> {
    const students = await this.repository.find();
    res.json(students);
  }

  async getStudentById(req: Request, res: Response): Promise<void> {
    try {
      const { error } = studentIdSchema.validate(req.params);
      if (error) throw new Error(error.details[0].message);

      const student = await this.repository.findOne({ where: { id: Number(req.params.id) } });
      student ? res.json(student) : res.status(404).end();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Failed to fetch student';
      res.status(400).json({ error: errMsg });
    }
  }

  async updateStudent(req: Request, res: Response): Promise<void> {
    try {
      const { error: idError } = studentIdSchema.validate(req.params);
      if (idError) throw new Error(idError.details[0].message);

      const { error: bodyError } = updateStudentSchema.validate(req.body);
      if (bodyError) throw new Error(bodyError.details[0].message);

      const student = await this.repository.update(req.params.id, req.body);
      res.json(student);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Failed to update student';
      res.status(400).json({ error: errMsg });
    }
  }

  async deleteStudent(req: Request, res: Response): Promise<void> {
    try {
      const { error } = studentIdSchema.validate(req.params);
      if (error) throw new Error(error.details[0].message);

      const result = await this.repository.delete(req.params.id);
      if (result.affected === 0) {
        res.status(404).json({ error: 'Student not found' });
        return;
      }
      res.status(204).end();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Failed to delete student';
      res.status(400).json({ error: errMsg });
    }
  }

  async getStudentsBySport(req: Request, res: Response): Promise<void> {
    try {
      const { error } = sportIdSchema.validate(req.params);
      if (error) throw new Error(error.details[0].message);

      const students = await this.repository.findBySport(parseInt(req.params.sportId));
      if (!students || students.length === 0) {
        res.status(404).json({ error: 'No students found for this sport' });
        return;
      }
      res.json(students);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Failed to fetch students by sport';
      res.status(400).json({ error: errMsg });
    }
  }

  async getStudentsByBatch(req: Request, res: Response): Promise<void> {
    try {
      const { error } = batchIdSchema.validate(req.params);
      if (error) throw new Error(error.details[0].message);

      const students = await this.repository.createQueryBuilder('student')
        .where('student.batchId = :batchId', { batchId: req.params.batchId })
        .getMany();
      res.json(students);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Failed to fetch students by batch';
      res.status(400).json({ error: errMsg });
    }
  }
}






import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from '../../../src/modules/students/student.controller';
import { StudentRepository } from '../../../src/modules/students/repositories/student.repository';

describe('StudentController', () => {
  let controller: StudentController;
  let mockRepository: Partial<StudentRepository>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findBySport: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createStudent', () => {
    it('should validate input before creating', async () => {
      const invalidStudent = {
        name: 'AB', // Too short
        phone: '123', // Invalid format
        sportId: 'not-a-number'
      };

      await expect(controller.createStudent(
        { body: invalidStudent } as Request,
        {} as Response
      )).rejects.toThrow();
    });

    it('should create valid student', async () => {
      const validStudent = {
        name: 'Test Student',
        phone: '9876543210',
        sportId: 1,
        batchId: 1,
        joiningDate: new Date()
      };

      mockRepository.save.mockResolvedValue(validStudent);
      
      const result = await controller.createStudent(
        { body: validStudent } as Request,
        {} as Response
      );
      
      expect(result).toEqual(validStudent);
      expect(mockRepository.save).toHaveBeenCalledWith(validStudent);
    });
  });

  describe('getStudentById', () => {
    it('should validate student ID', async () => {
      await expect(controller.getStudentById(
        { params: { id: 'invalid-id' } } as Request,
        {} as Response
      )).rejects.toThrow();
    });

    it('should return student if found', async () => {
      const mockStudent = { id: 1, name: 'Test Student' };
      mockRepository.findOne.mockResolvedValue(mockStudent);
      
      const result = await controller.getStudentById(
        { params: { id: '1' } } as Request,
        {} as Response
      );
      
      expect(result).toEqual(mockStudent);
    });

    it('should return 404 if student not found', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);
      
      const response = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn()
      } as unknown as Response;
      
      await controller.getStudentById(
        { params: { id: '999' } } as Request,
        response
      );
      
      expect(response.status).toHaveBeenCalledWith(404);
    });
  });

  describe('getStudentsBySport', () => {
    it('should validate sport ID', async () => {
      await expect(controller.getStudentsBySport(
        { params: { sportId: 'invalid-id' } } as Request,
        {} as Response
      )).rejects.toThrow();
    });

    it('should return students if found', async () => {
      const mockStudents = [{ id: 1, name: 'Test Student' }];
      mockRepository.findBySport.mockResolvedValue(mockStudents);
      
      const result = await controller.getStudentsBySport(
        { params: { sportId: '1' } } as Request,
        {} as Response
      );
      
      expect(result).toEqual(mockStudents);
    });

    it('should return 404 if no students found', async () => {
      mockRepository.findBySport.mockResolvedValue([]);
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      await controller.getStudentsBySport(
        { params: { sportId: '1' } } as Request,
        response
      );
      
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: 'No students found for this sport' })
      );
    });
  });

  describe('updateStudent', () => {
    it('should validate update data', async () => {
      const invalidUpdate = { name: 'AB' };
      await expect(controller.updateStudent(
        { params: { id: '1' }, body: invalidUpdate } as Request,
        {} as Response
      )).rejects.toThrow();
    });

    it('should update student if valid', async () => {
      const updateData = { name: 'Updated Name' };
      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOne.mockResolvedValue({ id: 1, ...updateData });

      const result = await controller.updateStudent(
        { params: { id: '1' }, body: updateData } as Request,
        {} as Response
      );
      expect(result.name).toEqual('Updated Name');
    });
  });

  describe('deleteStudent', () => {
    it('should validate student ID', async () => {
      await expect(controller.deleteStudent(
        { params: { id: 'invalid-id' } } as Request,
        {} as Response
      )).rejects.toThrow();
    });

    it('should return 204 on successful deletion', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });
      const response = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn()
      } as unknown as Response;

      await controller.deleteStudent(
        { params: { id: '1' } } as Request,
        response
      );
      expect(response.status).toHaveBeenCalledWith(204);
    });
  });
});



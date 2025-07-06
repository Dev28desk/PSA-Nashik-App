


import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { StudentModule } from '../modules/students/student.module';

export const setupStudentSwagger = (app: any) => {
  const config = new DocumentBuilder()
    .setTitle('Student Management API')
    .setDescription('API for managing sports academy students')
    .setVersion('1.0')
    .addTag('students')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [StudentModule],
  });

  SwaggerModule.setup('api/docs/students', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });
};

export const studentSchemas = {
  Student: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      name: { type: 'string', example: 'John Doe' },
      phone: { type: 'string', example: '9876543210' },
      sportId: { type: 'integer', example: 1 },
      batchId: { type: 'integer', example: 1 },
      joiningDate: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  },
  StudentCreate: {
    type: 'object',
    required: ['name', 'phone', 'sportId'],
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 100 },
      phone: { type: 'string', pattern: '^[0-9]{10}$' },
      sportId: { type: 'integer' },
      batchId: { type: 'integer' },
    },
  },
  StudentUpdate: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 100 },
      phone: { type: 'string', pattern: '^[0-9]{10}$' },
      sportId: { type: 'integer' },
      batchId: { type: 'integer' },
    },
  },
};



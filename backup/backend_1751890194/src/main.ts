

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupStudentSwagger } from './docs/students.swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  // Swagger documentation
  setupStudentSwagger(app);

  // Enable CORS for development
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();


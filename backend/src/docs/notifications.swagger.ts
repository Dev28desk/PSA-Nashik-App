


import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupNotificationSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('PSA Notification API')
    .setDescription('API for managing WhatsApp notifications')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [], // Add notification-related modules here
    deepScanRoutes: true
  });

  SwaggerModule.setup('api/notifications/docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method'
    }
  });
}



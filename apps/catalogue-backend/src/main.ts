import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Import SwaggerModule and DocumentBuilder

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Your Project API')
    .setDescription('API documentation for Your Project')
    .setVersion('1.0')
    .addTag('projects') // Add tag for 'projects' controller
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Setup Swagger UI at '/api-docs'

  // Start listening
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);

  // Additional logging if needed
  Logger.log(`🚀 Swagger UI available at: http://localhost:${port}/${globalPrefix}/api-docs`);
}

bootstrap();

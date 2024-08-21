import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Import SwaggerModule and DocumentBuilder

import { AppModule } from './app/app.module';

import * as dotenv from 'dotenv';
dotenv.config();

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
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token', // This is the name of the field that will be added to the Swagger UI
    )
    .build();  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Setup Swagger UI at '/api-docs'

  // Start listening
  const port = process.env.BACKEND_PORT;
  const host = process.env.HOST;
  app.enableCors();
  await app.listen(port, host);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);

  // Additional logging if needed
  Logger.log(`🚀 Swagger UI available at: http://localhost:${port}/api-docs`);
}

bootstrap();

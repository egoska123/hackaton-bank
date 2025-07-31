import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Настраиваем статическую раздачу файлов из папки uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  
  app.setGlobalPrefix('api');
  app.enableCors();

  // Настройка Swagger документации
  const config = new DocumentBuilder()
    .setTitle('KidBank API')
    .setDescription('API для детского банка с копилками, заданиями и транзакциями')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Аутентификация и регистрация')
    .addTag('piggybank', 'Управление копилками')
    .addTag('missions', 'Система заданий')
    .addTag('transactions', 'Транзакции')
    .addTag('uploads', 'Загрузка и получение файлов')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 4200);
  
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 4200}`);
  console.log(`📚 Swagger documentation: http://localhost:${process.env.PORT ?? 4200}/api/docs`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserService } from './modules/user/services/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Our Hive')
    .setDescription('Our Hive API description')
    .setVersion('1.0')
    .addTag('our-hive')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const userService = app.get(UserService);

  const adminExists = await userService.ensureAdminExists();

  if (!adminExists) {
    Logger.warn(
      'Admin user does not exist. Creating one, ensure to change the password of the default admin user',
    );
  }

  await app.listen(3000);
}
bootstrap();

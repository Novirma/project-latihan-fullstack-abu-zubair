import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from "express"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/uploads', express.static('public/gambar'));
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 2500;

  await app.listen(port, () => {
    console.log(`Server sedang berjalan di port ${port}`);
  });
}
bootstrap();

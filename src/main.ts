import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

// Handler khusus untuk Vercel Serverless Function
export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
};

bootstrap();
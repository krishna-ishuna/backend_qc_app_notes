import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function createServer() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors();
  await app.init();
  return server;
}

// Handler untuk Vercel Serverless Function
export default async (req: any, res: any) => {
  await createServer();
  return server(req, res);
};

// Jalankan server HTTP biasa untuk lingkungan pengembangan lokal (npm run start:dev)
if (process.env.NODE_ENV !== 'production') {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
  }
  bootstrap();
}
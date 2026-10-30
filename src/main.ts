import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let isAppInitialized = false;

async function bootstrapServerless() {
  if (!isAppInitialized) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors();
    await app.init();
    isAppInitialized = true;
  }
  return server;
}

// Handler utama untuk Vercel Serverless Function
export default async (req: any, res: any) => {
  await bootstrapServerless();
  return server(req, res);
};

// Mode pengujian lokal (npm run start:dev)
if (process.env.NODE_ENV !== 'production') {
  async function bootstrapLocal() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
  }
  bootstrapLocal();
}
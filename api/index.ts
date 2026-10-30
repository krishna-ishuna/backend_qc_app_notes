import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module.js';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let isInitialized = false;

async function bootstrap() {
    if (!isInitialized) {
        const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
        app.enableCors();
        await app.init();
        isInitialized = true;
    }
    return server;
}

export default async (req: any, res: any) => {
    await bootstrap();
    return server(req, res);
};
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module.js';
import { MasterModule } from './master/master.module.js';
import { ChecklistModule } from './checklist/checklist.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        // Diubah ke false karena tabel & data sudah lengkap di Neon
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
        // Wajib ditambahkan agar driver 'pg' di lingkungan Vercel tidak menolak koneksi SSL Neon
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    MasterModule,
    ChecklistModule,
  ],
})
export class AppModule { }
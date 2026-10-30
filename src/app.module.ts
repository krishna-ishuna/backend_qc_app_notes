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
        // Menggunakan URL langsung dari DATABASE_URL Neon
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        // Diubah ke true sementara agar TypeORM otomatis membuatkan tabel di Neon
        synchronize: true,
        // Wajib ditambahkan untuk koneksi SSL Neon
        ssl: {
          rejectUnauthorized: false,
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
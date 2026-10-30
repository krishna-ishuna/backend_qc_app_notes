import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity.js'; // Tambahkan .js
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(nama_lengkap: string, email: string, password: string, role: string) {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('Email sudah terdaftar!');
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const newUser = this.userRepository.create({
            nama_lengkap,
            email,
            password_hash,
            role,
        });

        await this.userRepository.save(newUser);
        return {
            message: 'Registrasi berhasil',
            user: { id: newUser.id, email: newUser.email, role: newUser.role }
        };
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Email atau password salah!');
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new UnauthorizedException('Email atau password salah!');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        const access_token = this.jwtService.sign(payload);

        return {
            message: 'Login berhasil',
            access_token,
            user: { id: user.id, nama_lengkap: user.nama_lengkap, email: user.email, role: user.role },
        };
    }
}
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js'; // Tambahkan .js

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: any) {
        return this.authService.register(body.nama_lengkap, body.email, body.password, body.role);
    }

    @Post('login')
    async login(@Body() body: any) {
        return this.authService.login(body.email, body.password);
    }
}
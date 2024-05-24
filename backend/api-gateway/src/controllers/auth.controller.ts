import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Body, Controller, Get, Header, Inject, OnModuleInit, Post, Req, UnauthorizedException } from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { AuthDto } from 'src/dto/auth.dto';
import { LoginResponse } from 'src/dto/login-responsive.dto';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('v1/auth')
export class AuthController implements OnModuleInit {
    private usersService;
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientGrpc,
        private jwtService: JwtService
    ) { }
    onModuleInit() {
        this.usersService = this.client.getService('AuthService');
    }

    @Post('login')
    @ApiBody({ type: AuthDto })
    @ApiResponse({ status: 200, type: LoginResponse })
    async login(
        @Body() params: AuthDto
    ) {
        if (!params) {
            return { status: 500, mess: '500 - Internal Service' }
        }
        // Kiểm tra trong đã login
        const rs = this.usersService.Login({
            studentId: params.student_id,
            password: params.password
        });
        return rs
    }

    async validateUser(token: string): Promise<boolean> {
        if (!token) {
            // Token không được cung cấp
            return false;
        }

        try {
            // Giải mã token
            const decodedToken = this.jwtService.verify(token);

            // Kiểm tra thông tin người dùng từ token
            // Đoạn mã kiểm tra thông tin người dùng có thể ở đây

            // Nếu không có lỗi, token là hợp lệ
            return true;
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Error validating token:', error.message);
            return false;
        }
    }

    @Get('getCache')
    @Header('authorization', 'null')
    async getCache(
        @Req() req: Request
    ) {
        if (!req.headers.authorization) {
            throw new UnauthorizedException('Missing authorization token');
        }
        console.log(req.headers.authorization);
        // Xác thực người dùng từ token
        const isValidUser = await this.validateUser(req.headers.authorization);
        if (!isValidUser) {
            throw new UnauthorizedException('Invalid authorization token');
        }

        // Lấy dữ liệu từ cache
        return this.cacheManager.get('user_token_20116031');
    }




}

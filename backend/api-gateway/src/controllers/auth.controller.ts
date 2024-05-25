import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from 'src/dtos/auth.dto';
import { LoginResponse } from 'src/dtos/login-responsive.dto';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('v1/auth')
export class AuthController implements OnModuleInit {
    private usersService;

    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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

    @Get('set-cache')
    async getCache(

    ) {
        await this.cacheManager.set('courses', 'Hello', 5000);
    }

    @Get('get-cache')
    async getCache2(
        // @Req() req: Request
    ) {
        return await this.cacheManager.get('studyPrograms');
    }
}

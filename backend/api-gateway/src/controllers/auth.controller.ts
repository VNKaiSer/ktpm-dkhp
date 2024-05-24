import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { AuthDto } from 'src/dto/auth.dto';

@Controller('v1/auth')
export class AuthController implements OnModuleInit {
    private usersService;
    constructor(
        @Inject('AUTH_SERVICE') private client: ClientGrpc,
    ) { }
    onModuleInit() {
        this.usersService = this.client.getService('AuthService');
    }

    @Post('login')
    async createUser(
        @Body() params: AuthDto
    ) {
        if (!params) {
            return { status: 500, mess: '500 - Internal Service' }
        }
        console.log(params)
        return this.usersService.Login({
            studentId: params.student_id,
            password: params.password
        });
    }


}

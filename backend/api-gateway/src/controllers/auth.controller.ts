import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
    private usersService;
    constructor(
        @Inject('USERS_SERVICE') private client: ClientGrpc,
    ) { }
    onModuleInit() {
        this.usersService = this.client.getService('UsersService');
    }

    @Get('users')
    async getUsers() {
        return this.usersService.GetUser({ email: 'Jon@gmail.com' });
    }


}

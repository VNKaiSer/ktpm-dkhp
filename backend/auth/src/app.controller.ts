import { Controller, Get } from '@nestjs/common';

import { GrpcMethod } from '@nestjs/microservices';
import { Account } from './entities/Account';
import { PrismaService } from './prisma/prisma.service';
import { AppService } from './app.service';
import { LoginResponsive } from './dtos/login-responsive.dto';

@Controller()
export class AppController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly appService: AppService,
  ) { }

  @Get()
  getHello(): string {
    return "I'm live!";
  }

  @GrpcMethod('AccountsService', 'Login')
  async login(account: Account): Promise<LoginResponsive | any> {
    const rs = await this.appService.signUp(account);
    if (rs) {
      const resp = {
        status: 200,
        data: rs,
      };
      return resp;
    }
    return {
      status: 500,
      mess: '500 - Internal Service',
    };
  }

  @GrpcMethod('AccountsService', 'Register')
  async register(account: Account): Promise<LoginResponsive | any> {
    const rs = await this.appService.signUp(account);
    if (rs) {
      const resp = {
        status: 200,
        token: rs.access_token,
      };
      return resp;
    }
    return {
      status: 500,
      mess: '500 - Internal Service',
    };
  }
}

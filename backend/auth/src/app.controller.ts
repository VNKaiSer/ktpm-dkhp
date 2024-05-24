import { Controller, Get } from '@nestjs/common';

import { GrpcMethod } from '@nestjs/microservices';
import { Account } from './entities/Account';
import { PrismaService } from './prisma/prisma.service';
import { AppService } from './app.service';
import { LoginResponse } from './dtos/login-responsive.dto';
import { AuthDto } from './dtos/auth.dto';
import { RegisterResponsive } from './dtos/register-responsive.dto';

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

  @GrpcMethod('AuthService', 'Login')
  async login(account: AuthDto): Promise<LoginResponse | any> {
    try {
      const rs = await this.appService.logIn(account);
      if (!rs) {
        return {
          status: '400',
          mess: 'Tên đăng nhập hoặc mật khẩu không chính xác',
        };
      }

      const resp = {
        status: '200',
        token: rs.access_token,
        // mess: 'Thành công',
      };
      return resp;
    } catch (error) {
      console.error(error);
      return {
        status: '500',
        mess: '500 - Internal Service Error',
      };
    }
  }

  @GrpcMethod('AuthService', 'Register')
  async register(account: Account): Promise<RegisterResponsive | any> {
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

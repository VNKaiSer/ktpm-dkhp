import { Controller, Get } from '@nestjs/common';

import { GrpcMethod } from '@nestjs/microservices';
import { Account } from './entities/Account';
import { PrismaService } from './prisma/prisma.service';
import { AppService } from './app.service';
import { LoginResponsive } from './dtos/login-responsive.dto';
import { AuthDto } from './dtos/auth.dto';

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
  async login(account: AuthDto): Promise<LoginResponsive | any> {
    console.log(account);
    try {
      const rs = await this.appService.logIn(account);
      console.log(rs);
      if (rs == null)
        return {
          status: 400,
          mess: 'Tên đăng nhập hoặc mật khẩu không chính xác',
        };
      if (rs) {
        const resp = {
          status: 200,
          data: rs,
        };
        return resp;
      }
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        mess: '500 - Internal Service',
      };
    }
    return {
      status: 500,
      mess: '500 - Internal Service',
    };
  }

  // @GrpcMethod('AuthService', 'Register')
  // async register(account: Account): Promise<LoginResponsive | any> {
  //   const rs = await this.appService.signUp(account);
  //   if (rs) {
  //     const resp = {
  //       status: 200,
  //       token: rs.access_token,
  //     };
  //     return resp;
  //   }
  //   return {
  //     status: 500,
  //     mess: '500 - Internal Service',
  //   };
  // }
}

import { Controller, Get } from '@nestjs/common';

import { GrpcMethod } from '@nestjs/microservices';
import { Account } from './entities/Account';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getHello(): string {
    return "I'm live!";
  }

  // @GrpcMethod('AccountsService', 'Register')
  // findOne(account: Account) {
  //   console.log(account);
  //   return account;
  // }

  @GrpcMethod('AccountsService', 'Login')
  async login(account: Account) {
    console.log(await this.hashPassword(account.password));
    const user = await this.prismaService.accounts.findUnique({
      where: {
        student_id: account.studentId,
      },
    });

    if (await this.validatePassword(account.password, user.password_hash)) {
      return {
        status: 'success',
        account: {
          studentId: user.student_id,
          email: user.email,
          // password: user.password_hash,
        },
      };
    } else {
      return {
        status: 'fail',
      };
    }
  }

  @GrpcMethod('AccountsService', 'Register')
  async register(account: Account) {
    console.log(account);
    const password_hash = await this.hashPassword(account.password);
    // console.log(password_hash);
    const register = await this.prismaService.accounts.create({
      data: {
        email: account.email,
        password_hash: password_hash,
        student_id: account.studentId,
      },
    });

    if (register) {
      return {
        status: 'success',
        account: {
          studentId: register.student_id,
          email: register.email,
          password: register.password_hash,
        },
      };
    } else {
      return {
        status: 'fail',
      };
    }
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async validatePassword(
    password: string,
    storedHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, storedHash);
  }
}

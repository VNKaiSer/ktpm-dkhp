import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('course')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('get-module')
  getModule() {
    console.log('get module');
    return this.appService.getModule();
  }

  @Get('all-course')
  async getAllCourse() {
    return this.appService.getAllCourse();
  }
}

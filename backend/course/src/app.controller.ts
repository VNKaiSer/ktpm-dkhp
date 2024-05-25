import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CourseIdDto } from './dtos/course-id.dto';

@Controller('v1/course')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @GrpcMethod('CourseService', 'GetAllCourse')
  async getAllCourse() {
    const rs = await this.appService.getAllCourse();
    return rs;
  }

  @GrpcMethod('CourseService', 'GetCourseById')
  async getCourseByID(parmas: CourseIdDto) {
    return this.appService.getCourseByID(parmas.id);
  }
}

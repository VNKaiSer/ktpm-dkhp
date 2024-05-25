import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CourseIdDto } from './dtos/course-id.dto';
import { RegisterCourseRequestDto } from './dtos/register-course-request.dto';

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
    const rs = await this.appService.getCourseByID(parmas.id);
    return {
      ...rs,
      prerequisite: rs.Prerequisite,
    };
  }

  @GrpcMethod('CourseService', 'GetStudyProgram')
  async getStudyProgram() {
    const studyProgram = await this.appService.getStudyProgram();
    return { studyPrograms: studyProgram };
  }

  @GrpcMethod('CourseService', 'RegisterCourse')
  async registerCourse(params: RegisterCourseRequestDto) {
    return await this.appService.registerCourse(params);
  }
}

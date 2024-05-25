import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { GrpcMethod } from '@nestjs/microservices';
import { RegisterCourseRequestDto } from './dtos/register-course-request.dto';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) { }
  getHello(): string {
    return 'Hello World!';
  }

  getModule() {
    return 'Module';
  }
  async getAllCourse(): Promise<any> {
    const courses = await this.prismaService.course.findMany();
    const updatedCourses = courses.map((course) => ({
      ...course,
      prerequisite: course.Prerequisite,
      Prerequisite: undefined, // xóa thuộc tính Prerequisite
    }));


    // Lọc bỏ thuộc tính Prerequisite nếu bạn không muốn nó hiện diện trong kết quả cuối cùng
    const finalCourses = updatedCourses.map(
      ({ Prerequisite, ...rest }) => rest,
    );
    return { courses: finalCourses };
  }

  async getCourseByID(id: string) {
    return await this.prismaService.course.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getStudyProgram() {
    return await this.prismaService.studyProgram.findMany();
  }

  async registerCourse(params: RegisterCourseRequestDto) {
    const student_id = params.studentId;
    delete params.studentId;
    return this.prismaService.classRegistered.create({
      data: {
        ...params,
        student_id,
      },
    });
  }

  async getReclass() {
    const reclass = await this.prismaService.classRegistered.findMany();
    const updatedReclass = reclass.map((item) => ({
      ...item,
      studentId: item.student_id,
      student_id: undefined,
    }));

    const finalReclass = updatedReclass.map(
      ({ student_id, ...rest }) => rest,
    );

    return await finalReclass
  }
}

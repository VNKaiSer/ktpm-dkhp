import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { GrpcMethod } from '@nestjs/microservices';

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
}

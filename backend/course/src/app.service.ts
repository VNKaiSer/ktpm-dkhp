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
    return { courses }
  }

  async getCourseByID(id: string) {
    return this.prismaService.course.findUnique({
      where: {
        id: id
      },
    });
  }
}

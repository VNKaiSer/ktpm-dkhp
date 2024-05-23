import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) { }
  getHello(): string {
    return 'Hello World!';
  }

  getModule() {
    return 'Module';
  }

  async getAllCourse() {
    return await this.prismaService.course.findMany();
  }

  async getCourseByID(id: string) {
    return this.prismaService.course.findUnique({
      where: {
        id: id
      },
    });
  }
}

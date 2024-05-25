import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('cache-topic')
  async handleCacheEvent(@Payload() message: any) {
    console.log(message);
    switch (message.cmd) {
      case 'course-cache-read':
        console.log('course-cache-read', message.data);
        console.log(JSON.stringify(message.data));
        await this.cacheManager.set(
          'courses',
          JSON.stringify(message.data),
          3600,
        );
        break;
      case 'studyProgram-cache-read':
        console.log('studyProgram-cache-read', message.data);
        // console.log(JSON.stringify(message.data));
        await this.cacheManager.set(
          'studyPrograms',
          JSON.stringify(message.data),
          3600,
        );
        break;
      case 'delete':
        console.log('delete', message.data);
        break;
    }
  }

  @EventPattern('register-course-topic')
  async handleRegisterCourseEvent(@Payload() message: any) {
    if (message.status === 'oke') {
      await this.appService.sendMail(
        'tandatvok16@gmail.com',
        'Tình trạng đăng kí học phần',
        'Sinh viên đăng kí học phần thành công',
      );
    } else {
      await this.appService.sendMail(
        'tandatvok16@gmail.com',
        'Tình trạng đăng kí học phần',
        'Sinh viên đăng kí học phần thất bại',
      );
    }
  }
}

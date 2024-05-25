import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Controller, Get, Inject, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from "@nestjs/swagger";
import { Cache } from 'cache-manager';
@Controller("v1/courses")
@ApiTags("courses")
export class CourseController implements OnModuleInit {
    private coursesService;

    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        @Inject('COURSE_SERVICE') private client: ClientGrpc,
    ) {

    }
    onModuleInit() {
        this.coursesService = this.client.getService('CourseService');
    }


    @Get()
    async getCourses(): Promise<any> {
        return this.coursesService.GetAllCourse({});
    }


}
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Body, Controller, Get, HttpCode, Inject, OnModuleInit, Post } from "@nestjs/common";
import { ClientGrpc } from '@nestjs/microservices';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Cache } from 'cache-manager';
import { lastValueFrom } from "rxjs";
import { RegisterCourseRequestDto } from "src/dtos/register-course-request.dto";
import { KafkaProducerService } from "src/kafka/kafka-producer.service";
@Controller("v1/courses")
@ApiTags("courses")
export class CourseController implements OnModuleInit {
    private coursesService;

    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        @Inject('COURSE_SERVICE') private client: ClientGrpc,
        private kafkaProducerService: KafkaProducerService,
    ) {

    }
    onModuleInit() {
        this.coursesService = this.client.getService('CourseService');
    }


    @Get()
    @ApiResponse({ status: 200 })
    async getCourses(): Promise<any> {
        const cacheCourese = await this.cacheManager.get('courses');
        if (cacheCourese) {
            return {
                courses: JSON.parse(Object(cacheCourese))
            };
        }

        const courses = await this.coursesService.GetAllCourse({});
        const data = Object(await lastValueFrom(courses));
        this.kafkaProducerService.sendMessage('cache-topic', {
            cmd: 'course-cache-read',
            data: data.courses

        });

        return courses
    }

    @Get("/study-program")
    @ApiResponse({ status: 200 })
    async getStudyProgram(): Promise<any> {
        const studyProgramCache = await this.cacheManager.get('studyPrograms');
        if (studyProgramCache) {
            console.log()
            return {
                studyPrograms: JSON.parse(Object(studyProgramCache))
            };
        }

        const studyProgram = await await this.coursesService.GetStudyProgram({});
        const data = Object(await lastValueFrom(studyProgram));
        this.kafkaProducerService.sendMessage('cache-topic', {
            cmd: 'studyProgram-cache-read',
            data: data.studyPrograms

        });

        return studyProgram

    }

    @Post("/register-course")
    @ApiResponse({ status: 200 })
    async registerCourse(@Body() params: RegisterCourseRequestDto): Promise<any> {
        try {
            const result = await this.coursesService.RegisterCourse(params);
            await this.kafkaProducerService.sendMessage('register-course-topic', {
                status: "oke"
            })
            return result
        } catch (error) {
            await this.kafkaProducerService.sendMessage('register-course-topic', {
                status: "no"
            })
            return HttpCode(500)
        }

    }




}
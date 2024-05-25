import { IsNotEmpty, IsString } from "class-validator";

export class CourseDto {

    @IsNotEmpty()
    @IsString()
    id: string
    codeCourse: string;
    codeSub: string
    credits: number;
    name: string;
    pracNum: string;
    theoryNum: number;

}
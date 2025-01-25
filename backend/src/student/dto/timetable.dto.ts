import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class AddCourseToTimetableDto {
    @IsString()
    @IsNotEmpty()
    day: string;

    @IsString()
    @IsNotEmpty()
    time: string;

    @IsString()
    @IsNotEmpty()
    courseCode: string;

    @IsString()
    @IsNotEmpty()
    courseName: string;

    @IsString()
    @IsNotEmpty()
    instructor: string;

    @IsString()
    @IsNotEmpty()
    room: string;

    @IsNumber()
    credit: number;

    @IsString()
    @IsNotEmpty()
    faculty: string;

    @IsString()
    note: string;
}

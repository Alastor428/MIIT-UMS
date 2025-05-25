import { IsString, IsNotEmpty } from "class-validator";
import { AddCourseToTimetableDto } from "./teacher-timetable.dto";

export class TeacherUpdateCourseAndTimetableDto {
    @IsString()
    @IsNotEmpty()
    oldCourseCode: string;

    @IsNotEmpty()
    newCourseData: AddCourseToTimetableDto; // Reuse the existing DTO here
}
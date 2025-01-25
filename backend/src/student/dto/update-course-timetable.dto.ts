import { IsString, IsNotEmpty } from "class-validator";
import { AddCourseToTimetableDto } from "./timetable.dto";

export class UpdateCourseAndTimetableDto {
    @IsString()
    @IsNotEmpty()
    oldCourseCode: string;

    @IsNotEmpty()
    newCourseData: AddCourseToTimetableDto; // Reuse the existing DTO here
}
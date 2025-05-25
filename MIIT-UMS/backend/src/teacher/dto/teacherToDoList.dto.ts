import { IsDate, IsString } from "class-validator";

export class TeacherToDoListDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    dueDate: Date;
}
import { IsDate, IsString } from "class-validator";

export class ToDoListDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    dueDate: Date;
}
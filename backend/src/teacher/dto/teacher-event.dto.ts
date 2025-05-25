import { IsDate, IsString } from "class-validator";

export class TeacherEventDto {
    @IsString()
    title: string;

    @IsString()
    details: string;

    @IsString()
    time: string;

    @IsString()
    sender: string;

    @IsString()
    batch: string;

    @IsDate()
    date: Date;

    @IsString()
    room: string;

}
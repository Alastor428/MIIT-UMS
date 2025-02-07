import { Type } from "class-transformer";
import { IsString, IsDate } from "class-validator";

export class CreateEventDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    time: string;

    @IsString()
    sender: string;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsString()
    place: string;

    @IsString()
    priority: string;
}

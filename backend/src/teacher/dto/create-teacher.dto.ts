import { IsString, IsBoolean } from 'class-validator';


export class CreateTeacherDto {
    @IsString()
    rank: string;

    @IsString()
    shortName: string;

    @IsString()
    department: string;

    @IsBoolean()
    isHOD: boolean;

}

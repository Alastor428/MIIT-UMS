import { IsString, IsBoolean } from 'class-validator';


export class CreateTeacherDto {

    @IsString()
    shortName: string;

    @IsString()
    department: string;

    @IsBoolean()
    isHOD: boolean;

}

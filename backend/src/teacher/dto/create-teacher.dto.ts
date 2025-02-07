import { IsString, IsBoolean } from 'class-validator';


export class CreateTeacherDto {

    @IsString()
    department: string;

    @IsBoolean()
    isHOD: boolean;

}

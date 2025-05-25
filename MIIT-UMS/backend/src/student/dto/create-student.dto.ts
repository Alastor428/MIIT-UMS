import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from 'src/auth/schemas/user.schema';


export class CreateStudentDto {

    @IsString()
    batch: string;

    @IsString()
    roll_no: string;
}

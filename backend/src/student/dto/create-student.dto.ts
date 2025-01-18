import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UserRole } from 'src/auth/schemas/user.schema';


export class CreateStudentDto extends CreateUserDto {

    @IsEnum(UserRole)
    role: UserRole;

    @IsString()
    batch: string;
}

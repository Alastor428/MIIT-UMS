import { IsEmail, IsEnum, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { User, UserRole } from "../schemas/user.schema";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
    password: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsString()
    batch?: string;

    @IsOptional()
    @IsString()
    department?: string;
}

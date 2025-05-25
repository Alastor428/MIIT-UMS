import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { Gender, User, UserRole } from "../schemas/user.schema";
import { AdminRole } from "src/admin/schemas/admin.schema";

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

    @IsEnum(Gender)
    gender: Gender;

    @IsOptional()
    @IsString()
    batch?: string;

    @IsOptional()
    @IsString()
    roll_no?: string;

    @IsOptional()
    @IsString()
    department?: string;

    @IsOptional()
    @IsBoolean()
    isHOD?: boolean;

    @IsOptional()
    @IsEnum(AdminRole)
    adminRole: AdminRole

    @IsOptional()
    @IsString()
    shortName: string;

    @IsOptional()
    @IsString()
    rank: string;

}

// src/teacher/dto/update-teacher.dto.ts
import { IsOptional, IsString, IsEmail, IsBoolean } from 'class-validator';

export class UpdateTeacherDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    department?: string;

    @IsOptional()
    @IsString()
    rank?: string;


    @IsOptional()
    @IsString()
    shortName?: string;

    @IsOptional()
    @IsBoolean()
    isHOD?: boolean;

    // Add any other updatable fields here
}

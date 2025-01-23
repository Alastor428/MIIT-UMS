import {
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CreateTeacherInput {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    profileImage: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    gender: string;

    @IsString()
    @IsNotEmpty()
    department: string;

    @IsString()
    @IsOptional()
    isHOD: boolean;
  }
  
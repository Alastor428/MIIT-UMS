import { IsString } from "class-validator";

export class forgotPasswordDto {
    @IsString()
    email: string;
}
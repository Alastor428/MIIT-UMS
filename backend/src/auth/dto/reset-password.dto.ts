import { IsString, Matches, MinLength } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    resetToken: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, { message: 'Password must contains at lease one number' })
    newPassword: string;
}
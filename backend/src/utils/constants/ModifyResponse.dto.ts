import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ModifyResponse {
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;

  @IsNotEmpty()
  @IsString()
  message: string;
}

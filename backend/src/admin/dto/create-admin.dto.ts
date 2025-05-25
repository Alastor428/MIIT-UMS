import { IsEnum } from "class-validator";
import { Admin, AdminRole } from "../schemas/admin.schema";

export class CreateAdminDto {

    @IsEnum(AdminRole, { message: `adminRole must be one of the following values: ${Object.values(AdminRole).join(', ')}` })
    adminRole: AdminRole;
}

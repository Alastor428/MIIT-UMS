import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('createAdmin/:userId')
  create(@Body() createAdminDto: CreateAdminDto,
    @Param('userId') userId: string) {
    return this.adminService.createAdmin(userId, createAdminDto);
  }


  @UseGuards(AuthGuard)
  @Get('get-admin')
  async findAdmin(@Req() req: any) {
    return await this.adminService.findAdminByUserId(req.userId);
  }

  // @Get('get-admin/:userId')
  // async findAdminByUserId(@Param('userId') userId: string) {
  //   return await this.adminService.findAdminByUserId(userId);
  // }

  @Get('getAdmin/:adminrole')
  async findAdminbyAdminRole(@Param('adminrole') adminRole: string) {

    const admins = await this.adminService.findAdminbyAdminRole(adminRole);
    return { admins };
  }

  @Get('all')
  async getAllAdmins() {
    const admins = await this.adminService.getAllAdmins();
    return {
      admins
    };
  }

  @Delete('delete/:id')
  remove(@Param('id') adminId: string) {
    return this.adminService.deleteAdmin(adminId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':adminId')
  update(@Param('adminId') adminId: string, @Body() updateAdminDto: CreateAdminDto) {
    return this.adminService.update(adminId, updateAdminDto);
  }

}

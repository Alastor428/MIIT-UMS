import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, ParseIntPipe } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTeacherInput } from './inputs/createTeacher.input';
import { ModifyResponse } from 'src/utils/constants/ModifyResponse.dto';
import { GetAllTeachersDto } from './dto/getAllTeachers.dto';
import { Teacher } from './models/teacher.model';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('getAllTeachers')
  async getAllUsers(
    @Query('offset', new ParseIntPipe()) offset: number,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('search') search: string,
    @Request() req,
  ): Promise<GetAllTeachersDto> {
    const authId = req.userId;
    return await this.teacherService.getAllTeachers(authId, offset, limit, search);
  }

  @Get('getTeacher')
  async getTeacher(
    @Query('userId') userId: string,
    @Request() req,
  ): Promise<Teacher> {
    const authId = req.userId;
    return await this.teacherService.getTeacher(userId);
  }


  @Post("createTeacher")
  // @UseGuards(AuthGuard)
  async createTeacher(
    @Request() req: any,
    @Body() input: CreateTeacherInput,
  ): Promise<ModifyResponse> {
    const authId = req.userId;
    return await this.teacherService.createTeacher(authId, input)
  }
}

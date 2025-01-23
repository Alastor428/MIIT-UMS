import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTeacherInput } from './inputs/createTeacher.input';
import { ModifyResponse } from 'src/utils/constants/ModifyResponse.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

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

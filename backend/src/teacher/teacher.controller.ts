import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Query, ParseIntPipe, Patch, ValidationPipe, UsePipes, Req } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ModifyResponse } from 'src/utils/constants/ModifyResponse.dto';
import { GetAllTeachersDto } from './dto/getAllTeachers.dto';
import { Teacher } from './models/teacher.schema';
import { TeacherTimetableService } from './services/teacher-timetable.service';
import { TeacherUpdateCourseAndTimetableDto } from './dto/teacher-update-course-timetable.dto';
import { TeacherToDoListDto } from './dto/teacherToDoList.dto';
import { TeacherToDoListService } from './services/teacher-to-do-list.service';
import { AddCourseToTimetableDto } from './dto/teacher-timetable.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly timetableService: TeacherTimetableService,
    private readonly todolistService: TeacherToDoListService
  ) { }

  @Post("createTeacher/:userId")
  // @UseGuards(AuthGuard)
  async createTeacher(
    @Param('userId') userId: string,
    @Body() input: CreateTeacherDto
  ): Promise<ModifyResponse> {
    return await this.teacherService.createTeacher(userId, input);
  }
  // get all teachers
  // @Get('all')
  // async getAllUsers(
  //   @Query('offset', new ParseIntPipe()) offset: number,
  //   @Query('limit', new ParseIntPipe()) limit: number,
  //   @Query('search') search: string,
  //   @Request() req,
  // ): Promise<GetAllTeachersDto> {
  //   const authId = req.userId;
  //   return await this.teacherService.getAllTeachers(authId, offset, limit, search);
  // }
  @Get('all')
  async getAllUsers() {
    return this.teacherService.getAllTeachers()
  }

  @Get('get-teacher/:userId')
  async getTeacherByUserId(@Param('userId') userId: string) {
    return await this.teacherService.getTeacherByUserId(userId);
  }

  @Get('email')
  async getTeacher(
    @Body('email') email: string,
  ): Promise<Teacher> {
    return await this.teacherService.getTeacher(email);
  }

  @UseGuards(AuthGuard)
  @Get('get-teacher')
  async getTeacherbyId(
    @Req() req: any,
  ) {
    return await this.teacherService.getTeacherByUserId(req.userId);
  }

  @Get('get-teacher/:department')
  async getTeacherByDept(
    @Param('department') department: string,
  ) {
    return await this.teacherService.getTeacherBydepartment(department);
  }



  // Delete a teacher document
  @Delete('delete/:id')
  async deleteTeacher(
    @Param('id') teacherId: string
  ): Promise<ModifyResponse> {
    const deletedTeacher = await this.teacherService.deleteTeacher(teacherId);
    return {
      success: true,
      message: 'Teacher deleted successfully'
    };
  }

  // Time Table

  // Add a course to the table
  @UseGuards(AuthGuard)
  @Post('timetable')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async addCourseToTimetable(
    @Req() req: any,
    @Body() timetableData: AddCourseToTimetableDto,
  ) {
    const result = await this.timetableService.addCourseToTimetable(req.userId, timetableData);
    return result;
  }
  // Get a teacher's timetable
  @UseGuards(AuthGuard)
  @Get('timetable')
  async getStudentTimetable(@Req() req: any) {
    const timetable = await this.timetableService.getTeacherTimetable(req.userId);
    return timetable;
  };

  // Update a course and its references in the timetable
  @UseGuards(AuthGuard)
  @Put('update-course')
  async updateCourseAndTimetable(
    @Req() req: any,
    @Body() updateData: TeacherUpdateCourseAndTimetableDto,
  ) {
    const response = await this.timetableService.editCourse(
      req.userId,
      updateData.oldCourseCode,
      updateData.newCourseData,
    );
    return {
      message: response.message,
      course: response.course,
    };
  }

  // Reset a teacher's timetable
  @UseGuards(AuthGuard)
  @Patch('timetable/reset')
  async resetTimetable(@Req() req: any) {
    const response = await this.timetableService.resetTimetable(req.userId);
    return {
      message: response.message,
      timetable: response.timetable,
    };
  }

  // Delete a course from the timetable
  @UseGuards(AuthGuard)
  @Delete('course/:courseId')
  async deleteCourse(
    @Req() req: any,
    @Param('courseId') courseId: string,
  ) {
    const result = await this.timetableService.deleteCourse(req.userId, courseId);
    return result;
  }

  // Delete a single cell in the timetable
  @UseGuards(AuthGuard)
  @Delete('timetable/cell')
  async deleteTimetableCell(
    @Req() req: any,
    @Body() deleteData: { day: string; time: string },
  ) {
    const { day, time } = deleteData;
    return await this.timetableService.deleteTimetableCell(req.userId, day, time);
  }



  // Add existing course to the timetable
  @Post(':teacherId/timetable/cell')
  async addExistingCourseToTimetable(
    @Param('teacherId') teacherId: string,
    @Body() addData: { day: string; time: string; courseCode: string },
  ) {
    const { day, time, courseCode } = addData;
    return await this.timetableService.addExistingCourseToTimetable(teacherId, day, time, courseCode);
  }

  // To do List


  // Update to do list
  @UseGuards(AuthGuard)
  @Put('to-do-list')
  async updateToDoList(
    @Req() req: any,
    @Body() todoListData: TeacherToDoListDto[],
  ) {
    const result = await this.todolistService.updateToDoList(req.userId, todoListData);
    return result;
  }
  // Get To do list
  @UseGuards(AuthGuard)
  @Get('to-do-list')
  async getToDoList(@Req() req: any) {
    const result = await this.todolistService.getToDoList(req.userId);
    return result;
  }
  // Delete a task from the list
  @UseGuards(AuthGuard)
  @Delete('to-do-list/:taskTitle')
  async deleteTask(
    @Req() req: any,
    @Param('taskTitle') taskTitle: string, // Extract taskTitle from the route
  ) {
    return await this.todolistService.deleteTask(req.userId, taskTitle);
  }
}

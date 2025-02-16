import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Query, ParseIntPipe, Patch, ValidationPipe, UsePipes } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ModifyResponse } from 'src/utils/constants/ModifyResponse.dto';
import { GetAllTeachersDto } from './dto/getAllTeachers.dto';
import { Teacher } from './models/teacher.schema';
import { TeacherTimetableService } from './services/teacher-timetable.service';
import { TeacherUpdateCourseAndTimetableDto } from './dto/teacher-update-course-timetable.dto';
import { TeacherToDoListDto } from './dto/teacherToDoList.dto';
import { TeacherToDoListService } from './services/teacher-to-do-list.service';
import { AddCourseToTimetableDto } from './dto/teacher-timetable.dto';

@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly timetableService: TeacherTimetableService,
    private readonly todolistService: TeacherToDoListService
  ) { }

  //FIXME: get all teachers
  @Get('all')
  async getAllUsers(
    @Query('offset', new ParseIntPipe()) offset: number,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('search') search: string,
    @Request() req,
  ): Promise<GetAllTeachersDto> {
    const authId = req.userId;
    return await this.teacherService.getAllTeachers(authId, offset, limit, search);
  }

  @Get('get-teacher')
  async getTeacher(
    @Body('email') email: string,
  ): Promise<Teacher> {
    return await this.teacherService.getTeacher(email);
  }


  @Post("createTeacher/:userId")
  // @UseGuards(AuthGuard)
  async createTeacher(
    @Param('userId') userId: string,
    @Body() input: { department: string, isHOD: boolean },
  ): Promise<ModifyResponse> {
    return await this.teacherService.createTeacher(userId, input);
  }

  // Delete a teacher document
  @Delete(':id')
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
  @Post(':teacherId/timetable')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async addCourseToTimetable(
    @Param('teacherId') teacherId: string,
    @Body() timetableData: AddCourseToTimetableDto,
  ) {
    const result = await this.timetableService.addCourseToTimetable(teacherId, timetableData);
    return result;
  }
  // Get a teacher's timetable
  @Get(':teacherId/timetable')
  async getStudentTimetable(@Param('teacherId') teacherId: string) {
    const timetable = await this.timetableService.getTeacherTimetable(teacherId);
    return timetable;
  };

  // Update a course and its references in the timetable
  @Put('update-course/:teacherId')
  async updateCourseAndTimetable(
    @Param('teacherId') teacherId: string,
    @Body() updateData: TeacherUpdateCourseAndTimetableDto,
  ) {
    const response = await this.timetableService.editCourse(
      teacherId,
      updateData.oldCourseCode,
      updateData.newCourseData,
    );
    return {
      message: response.message,
      course: response.course,
    };
  }

  // Reset a teacher's timetable
  @Patch(':teacherId/reset')
  async resetTimetable(@Param('teacherId') teacherId: string) {
    const response = await this.timetableService.resetTimetable(teacherId);
    return {
      message: response.message,
      timetable: response.timetable,
    };
  }

  //SUCCESS: Delete a course from the timetable
  @Delete(':teacherId/course/:courseId')
  async deleteCourse(
    @Param('teacherId') teacherId: string,
    @Param('courseId') courseId: string,
  ) {
    const result = await this.timetableService.deleteCourse(teacherId, courseId);
    return result;
  }

  //SUCCESS: Delete a single cell in the timetable
  @Delete(':teacherId/timetable/cell')
  async deleteTimetableCell(
    @Param('teacherId') teacherId: string,
    @Body() deleteData: { day: string; time: string },
  ) {
    const { day, time } = deleteData;
    return await this.timetableService.deleteTimetableCell(teacherId, day, time);
  }



  //SUCCESS: Add existing course to the timetable
  @Post(':teacherId/timetable/cell')
  async addExistingCourseToTimetable(
    @Param('teacherId') teacherId: string,
    @Body() addData: { day: string; time: string; courseCode: string },
  ) {
    const { day, time, courseCode } = addData;
    return await this.timetableService.addExistingCourseToTimetable(teacherId, day, time, courseCode);
  }

  // To do List


  //SUCCESS: Update to do list
  @Put(':teacherId/to-do-list')
  async updateToDoList(
    @Param('teacherId') teacherId: string,
    @Body() todoListData: TeacherToDoListDto[],
  ) {
    const result = await this.todolistService.updateToDoList(teacherId, todoListData);
    return result;
  }
  //SUCCESS: Get To do list
  @Get(':teacherId/to-do-list')
  async getToDoList(@Param('teacherId') teacherId: string) {
    const result = await this.todolistService.getToDoList(teacherId);
    return result;
  }
  //SUCCESS: Delete a task from the list
  @Delete(':teacherId/to-do-list/:taskTitle')
  async deleteTask(
    @Param('teacherId') teacherId: string,
    @Param('taskTitle') taskTitle: string, // Extract taskTitle from the route
  ) {
    return await this.todolistService.deleteTask(teacherId, taskTitle);
  }
}

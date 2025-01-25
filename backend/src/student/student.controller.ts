import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, ValidationPipe, UsePipes } from '@nestjs/common';
import { StudentService } from './student.service';
import { ToDoListService } from './services/todolist.service';
import { TimetableService } from './services/timetable.service';
import { AddCourseToTimetableDto } from './dto/timetable.dto';
import { UpdateCourseAndTimetableDto } from './dto/update-course-timetable.dto';
import { ToDoListDto } from './dto/todolist.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService,
    private readonly timetableService: TimetableService,
    private readonly toDoListService: ToDoListService,
  ) { }

  @Post('create/:userId')
  async createStudent(
    @Param('userId') userId: string, // Get the userId from the route parameter
    @Body() createStudentDto: { batch: string }, // Only accept student-specific data
  ) {
    const { batch } = createStudentDto;

    // Delegate to the StudentService
    const student = await this.studentService.createStudent(userId, { batch });

    return {
      message: 'Student record created successfully',
      student,
    };
  }

  @Get('get-student')
  async findOneStudent(@Body() email: string) {
    const studentData = await this.studentService.findStudentByEmail(email);
    return studentData;
  }


  // Time Table

  @Post(':studentId/timetable')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async addCourseToTimetable(
    @Param('studentId') studentId: string,
    @Body() timetableData: AddCourseToTimetableDto,
  ) {
    const result = await this.timetableService.addCourseToTimetable(studentId, timetableData);
    return result;
  }

  // Get a student's timetable
  @Get(':studentId/timetable')
  async getStudentTimetable(@Param('studentId') studentId: string) {
    const timetable = await this.timetableService.getStudentTimetable(studentId);
    return timetable;
  }

  // Update a course and its references in the timetable
  @Put('update-course/:studentId')
  async updateCourseAndTimetable(
    @Param('studentId') studentId: string,
    @Body() updateData: UpdateCourseAndTimetableDto,
  ) {
    const response = await this.timetableService.editCourse(
      studentId,
      updateData.oldCourseCode,
      updateData.newCourseData,
    );
    return {
      message: response.message,
      course: response.course,
    };
  }

  // Add multiple timetable entries
  @Post('add-multiple/:studentId')
  async addMultipleTimetableEntries(
    @Param('studentId') studentId: string,
    @Body() requestBody: {
      timetable: Array<{
        time: string;
        Monday: any;
        Tuesday: any;
        Wednesday: any;
        Thursday: any;
        Friday: any;
      }>;
      course_details: Array<{
        courseCode: string;
        courseName: string;
        instructor: string;
        room: string;
        credit: number;
        faculty: string;
        note: string;
        _id: string;
      }>;
    },
  ) {
    const result = await this.timetableService.addMultipleTimetableEntries(studentId, requestBody);
    return result;
  }

  // Reset a student's timetable
  @Patch(':studentId/reset')
  async resetTimetable(@Param('studentId') studentId: string) {
    const response = await this.timetableService.resetTimetable(studentId);
    return {
      message: response.message,
      timetable: response.timetable,
    };
  }

  // Delete a course from the timetable
  @Delete(':studentId/course/:courseId')
  async deleteCourse(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    const result = await this.timetableService.deleteCourse(studentId, courseId);
    return result;
  }

  // Delete a single cell in the timetable
  @Delete(':studentId/timetable/cell')
  async deleteTimetableCell(
    @Param('studentId') studentId: string,
    @Body() deleteData: { day: string; time: string },
  ) {
    const { day, time } = deleteData;
    return await this.timetableService.deleteTimetableCell(studentId, day, time);
  }

  @Post(':studentId/timetable/cell')
  async addExistingCourseToTimetable(
    @Param('studentId') studentId: string,
    @Body() addData: { day: string; time: string; courseCode: string },
  ) {
    const { day, time, courseCode } = addData;
    return await this.timetableService.addExistingCourseToTimetable(studentId, day, time, courseCode);
  }

  // To Do List

  // Update to do list
  @Put(':studentId/to-do-list')
  async updateToDoList(
    @Param('studentId') studentId: string,
    @Body() todoListData: ToDoListDto[],
  ) {
    const result = await this.toDoListService.updateToDoList(studentId, todoListData);
    return result;
  }
  // Get To do list
  @Get(':studentId/to-do-list')
  async getToDoList(@Param('studentId') studentId: string) {
    const result = await this.toDoListService.getToDoList(studentId);
    return result;
  }
  // Delete a task from the list
  @Delete(':studentId/to-do-list/:taskTitle')
  async deleteTask(
    @Param('studentId') studentId: string,
    @Param('taskTitle') taskTitle: string, // Extract taskTitle from the route
  ) {
    return await this.toDoListService.deleteTask(studentId, taskTitle);
  }
}

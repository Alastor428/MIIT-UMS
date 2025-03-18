import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, ValidationPipe, UsePipes, Req, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { ToDoListService } from './services/student-todolist.service';
import { TimetableService } from './services/student-timetable.service';
import { AddCourseToTimetableDto } from './dto/student-timetable.dto';
import { UpdateCourseAndTimetableDto } from './dto/update-course-timetable.dto';
import { ToDoListDto } from './dto/todolist.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth } from 'src/auth/entities/auth.entity';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService,
    private readonly timetableService: TimetableService,
    private readonly toDoListService: ToDoListService,
  ) { }

  // Create Student
  @Post('create/:userId')
  async createStudent(
    @Param('userId') userId: string, // Get the userId from the route parameter
    @Body() createStudentDto: { batch: string, roll_no: string }, // Only accept student-specific data
  ) {
    const { batch, roll_no } = createStudentDto;

    // Delegate to the StudentService
    const student = await this.studentService.createStudent(userId, { batch, roll_no });

    return {
      message: 'Student record created successfully',
      student,
    };
  }

  // Get student

  @Get('get-student/:email')
  async findOneStudent(@Param('email') email: string) {
    const studentData = await this.studentService.findStudentByEmail(email);
    return studentData;
  }

  // Get student by user Id
  @UseGuards(AuthGuard)
  @Get('get-student')
  async findStudentById(@Req() req: any) {
    const studentData = await this.studentService.findStudentByUserId(req.userId);
    return studentData;
  }

  // Delete Student
  @Delete('delete/:id')
  async deleteStudent(@Param('id') studentId: string) {
    const deletedStudent = await this.studentService.deleteStudent(studentId);
    return {
      message: 'Student deleted successfully',
      student: deletedStudent,
    };
  }

  // Get all students
  @Get('all')
  async getAllStudents() {
    const students = await this.studentService.getAllStudents();
    return {
      message: 'All students retrieved successfully',
      count: students.length,
      students,
    };
  }

  // Get student by batch
  @Get('get-student/:batch')
  async getStudentsByBatch(@Param('batch') batch: string) {
    const students = await this.studentService.getStudentsByBatch(batch);

    if (!students || students.length === 0) {
      throw new NotFoundException(`No students found for batch: ${batch}`);
    }
    return {
      message: `Students retrieved for batch: ${batch}`,
      count: students.length,
      students,
    };
  }


  // Time Table

  // Add course to the timetable
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
  @UseGuards(AuthGuard)
  @Get('get-timetable')
  async getStudentTimetable(@Req() req: any) {
    const timetable = await this.timetableService.getStudentTimetable(req.userId);
    return timetable;
  }

  // Update a course and its references in the timetable
  @UseGuards(AuthGuard)
  @Put('update-course')
  async updateCourseAndTimetable(
    @Req() req: any,
    @Body() updateData: UpdateCourseAndTimetableDto,
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
  @UseGuards(AuthGuard)
  @Post('timetable/cell')
  async addExistingCourseToTimetable(
    @Param('studentId') studentId: string,
    @Body() addData: { day: string; time: string; courseCode: string },
  ) {
    const { day, time, courseCode } = addData;
    return await this.timetableService.addExistingCourseToTimetable(studentId, day, time, courseCode);
  }

  // To Do List

  // Update to do list
  @UseGuards(AuthGuard)
  @Put('to-do-list')
  async updateToDoList(
    @Req() req: any,
    @Body() todoListData: ToDoListDto[],
  ) {
    const result = await this.toDoListService.updateToDoList(req.userId, todoListData);
    return result;
  }
  // Get To do list
  @UseGuards(AuthGuard)
  @Get('to-do-list')
  async getToDoList(@Req() req: any) {
    const result = await this.toDoListService.getToDoList(req.userId);
    return result;
  }
  // Delete a task from the list
  @UseGuards(AuthGuard)
  @Delete('to-do-list/:taskTitle')
  async deleteTask(
    @Req() req: any,
    @Param('taskTitle') taskTitle: string, // Extract taskTitle from the route
  ) {
    return await this.toDoListService.deleteTask(req.userId, taskTitle);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StudentService, TimetableService, ToDoListService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService,
    private readonly timeTableService: TimetableService,
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
  @Get(':id/timetable')
  async getStudentTimetable(@Param('id') id: string) {
    const timeTable = await this.timeTableService.getStudentTimeTable(id);
    return timeTable;
  }

  @Put(':id/timetable')
  async updateStudentTimetable(
    @Param('id') id: string,
    @Body() timetableData: Record<string, Record<string, string>>,
  ) {
    const message = await this.timeTableService.updateTimeTable(id, timetableData);
    return message;
  }

  // To Do List
  @Put(':id/to-do-list')
  async updateToDoList(
    @Param('id') id: string,
    @Body() toDoListData: string[],
  ) {
    const message = await this.toDoListService.updateTimeTable(id, toDoListData);
    return message;
  }

  @Get(':id/to-do-list')
  async getToDoList(
    @Param('id') id: string
  ) {
    const list = await this.toDoListService.getToDoList(id);
    return list;
  }
}

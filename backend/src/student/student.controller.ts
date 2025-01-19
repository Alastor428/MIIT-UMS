import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { StudentService, TimetableService } from './student.service';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './schemas/student.schema';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService,
    private readonly timeTableService: TimetableService,
    @InjectModel(Student.name) private StudentModel: Model<Student>,
    @InjectModel(Student.name) private UserModel: Model<User>
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
}

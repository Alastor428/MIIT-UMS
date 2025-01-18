import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

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


}


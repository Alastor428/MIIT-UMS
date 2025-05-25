import { Module } from '@nestjs/common';
import { BatchTimetableController } from './batch.controller';
import { BatchTimetableService } from './batch.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { BatchTimeTable, BatchTimeTableSchema } from './schemas/batchTimeTable.schema';
import { CourseDetailsModule } from 'src/course-details/course-details.module';
import { StudentService } from 'src/student/student.service';
import { AuthModule } from 'src/auth/auth.module';
import { Student, studentSchema } from 'src/student/schemas/student.schema';
import { TimetableService } from 'src/student/services/student-timetable.service';
import { TeacherTimetableService } from 'src/teacher/services/teacher-timetable.service';
import { Teacher, TeacherSchema } from 'src/teacher/models/teacher.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: BatchTimeTable.name, schema: BatchTimeTableSchema
        },

      ]),
    CourseDetailsModule,
    MongooseModule.forFeature([{ name: Student.name, schema: studentSchema }]),
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    AuthModule, // Import the module where UserModel is provided
  ],
  controllers: [BatchTimetableController],
  providers: [BatchTimetableService, StudentService, AuthModule, TimetableService, TeacherTimetableService],
  exports: [BatchTimetableService]
})
export class BatchModule { }

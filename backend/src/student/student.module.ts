import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { ToDoListService } from './services/student-todolist.service';
import { TimetableService } from './services/student-timetable.service';
import { Student, studentSchema } from './schemas/student.schema';
import { AuthModule } from 'src/auth/auth.module';
import { CourseDetailsService } from 'src/course-details/course-details.service';
import { CourseDetailsModule } from 'src/course-details/course-details.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Student.name, schema: studentSchema }]),
    CourseDetailsModule,
  ],
  controllers: [StudentController],
  providers: [StudentService, TimetableService, ToDoListService, CourseDetailsService],
  exports: [StudentService, MongooseModule], // Export the service if needed in other modules
})
export class StudentModule { }

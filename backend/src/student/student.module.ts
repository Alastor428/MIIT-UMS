import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentService, TimetableService } from './student.service';
import { Student, studentSchema } from './schemas/student.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: studentSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [StudentController],
  providers: [StudentService, TimetableService],
  exports: [StudentService, MongooseModule], // Export the service if needed in other modules
})
export class StudentModule { }

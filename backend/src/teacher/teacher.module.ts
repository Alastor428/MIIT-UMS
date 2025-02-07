import { forwardRef, Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { CreateTeacher } from './operations/mutation/createTeacher';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './models/teacher.model';
import { GetAllTeachers } from './operations/query/getAllTeachers';
import { GetTeacher } from './operations/query/getTeacher';
import { AuthModule } from 'src/auth/auth.module';
import { TeacherTimetableService } from './services/teacher-timetable.service';
import { TeacherToDoListService } from './services/teacher-to-do-list.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [TeacherController],
  providers: [TeacherService, CreateTeacher, GetAllTeachers, GetTeacher, TeacherTimetableService, TeacherToDoListService],
  exports: [TeacherService, MongooseModule]
})
export class TeacherModule { }

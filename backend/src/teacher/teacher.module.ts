import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { CreateTeacher } from './operations/mutation/createTeacher';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './models/teacher.model';
import { GetAllTeachers } from './operations/query/getAllTeachers';
import { GetTeacher } from './operations/query/getTeacher';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService, CreateTeacher, GetAllTeachers, GetTeacher],
})
export class TeacherModule {}

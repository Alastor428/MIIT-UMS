import { forwardRef, Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { CreateTeacher } from './operations/mutation/createTeacher';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './models/teacher.schema';
import { GetAllTeachers } from './operations/query/getAllTeachers';
import { GetTeacher } from './operations/query/getTeacher';
import { AuthModule } from 'src/auth/auth.module';
import { TeacherTimetableService } from './services/teacher-timetable.service';
import { TeacherToDoListService } from './services/teacher-to-do-list.service';
import { NotificationService } from './services/teacher-notification.service';
import { Student, studentSchema } from 'src/student/schemas/student.schema';
import { EventsGateway } from 'src/gateways/teacher-event.gateway';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }, { name: Student.name, schema: studentSchema }]),

    forwardRef(() => AuthModule),
  ],
  controllers: [TeacherController],
  providers: [TeacherService, CreateTeacher, GetAllTeachers, GetTeacher, TeacherTimetableService, TeacherToDoListService, NotificationService, EventsGateway],
  exports: [TeacherService, MongooseModule]
})
export class TeacherModule { }

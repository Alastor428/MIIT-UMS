import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ModifyResponse } from 'src/utils/constants/ModifyResponse.dto';
import { CreateTeacher } from './operations/mutation/createTeacher';
import { GetAllTeachers } from './operations/query/getAllTeachers';
import { GetAllTeachersDto } from './dto/getAllTeachers.dto';
import { Teacher } from './models/teacher.schema';
import { GetTeacher } from './operations/query/getTeacher';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherCreate: CreateTeacher,
    private readonly fetchAllTeachers: GetAllTeachers,
    private readonly fetchTeacher: GetTeacher,
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>
  ) { }

  async createTeacher(
    userId: string,
    input: CreateTeacherDto
  ): Promise<ModifyResponse> {
    return await this.teacherCreate.createTeacher(userId, input)
  }

  async getAllTeachers(
    authId: string,
    offset: number,
    limit: number,
    search: string,
  ): Promise<GetAllTeachersDto> {
    return await this.fetchAllTeachers.getAllTeachers(authId, offset, limit, search);
  }


  async getTeacher(email: string): Promise<Teacher> {
    return await this.fetchTeacher.getTeacher(email);
  }

  async deleteTeacher(teacherId: string): Promise<Teacher> {
    const deletedTeacher = await this.teacherModel.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }
    return deletedTeacher;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateTeacherInput } from './inputs/createTeacher.input';
import { ModifyResponse } from 'src/utils/constants/ModifyResponse.dto';
import { CreateTeacher } from './operations/mutation/createTeacher';
import { GetAllTeachers } from './operations/query/getAllTeachers';
import { GetAllTeachersDto } from './dto/getAllTeachers.dto';
import { Teacher } from './models/teacher.model';
import { GetTeacher } from './operations/query/getTeacher';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherCreate: CreateTeacher,
    private readonly fetchAllTeachers: GetAllTeachers,
    private readonly fetchTeacher: GetTeacher,
  ) {}

  async createTeacher(
    authId: string,
    input: CreateTeacherInput
  ): Promise<ModifyResponse> {
    return await this.teacherCreate.createTeacher(authId, input)
  }

  async getAllTeachers(
    authId: string,
    offset: number,
    limit: number,
    search: string,
  ): Promise<GetAllTeachersDto> {
    return await this.fetchAllTeachers.getAllTeachers(authId, offset, limit, search);
  }
  async getTeacher(userId: string): Promise<Teacher> {
    return await this.fetchTeacher.getTeacher(userId);
  }
}

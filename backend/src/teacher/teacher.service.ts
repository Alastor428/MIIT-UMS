import { Injectable } from '@nestjs/common';
import { CreateTeacherInput } from './inputs/createTeacher.input';
import { ModifyResponse } from 'src/utils/constants/ModifyResponse.dto';
import { CreateTeacher } from './operations/mutation/createTeacher';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherCreate: CreateTeacher
  ) {}
  async createTeacher(
    authId: string,
    input: CreateTeacherInput
  ): Promise<ModifyResponse> {
    return await this.teacherCreate.createTeacher(authId, input)
  }
}

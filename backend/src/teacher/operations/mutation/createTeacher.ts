import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Teacher, TeacherDocument } from 'src/teacher/models/teacher.model';
import { CreateTeacherInput } from 'src/teacher/inputs/createTeacher.input';
import { ModifyResponse } from 'src/utils/constants/ModifyResponse.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateTeacher {
  constructor(
      @InjectModel(Teacher.name) private teacherModal: Model<TeacherDocument>,
    ) { }

  async createTeacher(
    authId: string,
    input: CreateTeacherInput,
  ): Promise<ModifyResponse> {
    // if (!authId) {
    //   throw new UnauthorizedException('U have to sign in first');
    // }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(input.password, saltRounds);

    const newTeacher = new this.teacherModal({
      name: input.name,
      profileImage: input.profileImage,
      email: input.email,
      password: hashedPassword,
      gender: input.gender,
      department: input.department,
      isHOD: input.isHOD
    });

    try {
      await newTeacher.save();
      return {
        success: true,
        message: 'Teacher Created Successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

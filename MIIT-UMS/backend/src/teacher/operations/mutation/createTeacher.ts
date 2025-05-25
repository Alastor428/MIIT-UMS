import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Teacher, TeacherDocument } from 'src/teacher/models/teacher.schema';
import { CreateTeacherDto } from 'src/teacher/dto/create-teacher.dto';
import { ModifyResponse } from 'src/utils/constants/ModifyResponse.dto';

@Injectable()
export class CreateTeacher {
  constructor(
    @InjectModel(Teacher.name) private teacherModal: Model<TeacherDocument>,
    @InjectModel(User.name) private authModel: Model<User>
  ) { }

  async createTeacher(
    userId: string,
    input: CreateTeacherDto,
  ): Promise<ModifyResponse> {
    const user = await this.authModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Wrong Ceredentials');
    }

    const newTeacher = new this.teacherModal({
      user: new Types.ObjectId(userId),
      ...input
    });

    try {
      await newTeacher.save();
      return {
        success: true,
        message: 'Teacher Created Successfully',
      };
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error);
    }
  }
}

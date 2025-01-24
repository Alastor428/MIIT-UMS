import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from 'src/teacher/models/teacher.model';

@Injectable()
export class GetTeacher {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
  ) {}

  async getTeacher(userId: string): Promise<Teacher> {
    try {
      const teacher = await this.teacherModel.findById(userId).exec();
      if (!teacher) {
        throw new InternalServerErrorException('User not found');
      }
      return teacher;
    } catch (error) {
      console.log(error, 'this is getTeacher errors');
      console.error('Error fetching users:', error);
      throw new InternalServerErrorException('Error fetching users');
    }
  }
}

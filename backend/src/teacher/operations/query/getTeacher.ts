import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from 'src/teacher/models/teacher.model';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class GetTeacher {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async getTeacher(email: string): Promise<Teacher> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const teacher = await this.teacherModel
        .findOne({ user: user._id })
        .populate({
          path: 'user',
          select: "name email role gender"
        })
      if (!teacher) {
        throw new NotFoundException("Teacher not found!")
      }
      return teacher
    } catch (error) {
      throw new InternalServerErrorException('Error fetching users');
    }
  }
}

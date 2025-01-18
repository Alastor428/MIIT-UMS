import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { Student } from './schemas/student.schema';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(User.name) private readonly authModel: Model<User>,
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) { }

  async createStudent(userId: string, data: { batch: string; }): Promise<Student> {
    const student = new this.studentModel({
      user: userId,
      ...data,
    });

    return student.save();
  }

}

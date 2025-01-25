import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { Student } from './schemas/student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(User.name) private readonly authModel: Model<User>,
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) { }

  async createStudent(userId: string, data: { batch: string; }): Promise<Student> {

    // Validate that the user exists in the database
    const user = await this.authModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const student = new this.studentModel({
      user: new Types.ObjectId(userId),
      ...data,
    });

    return student.save();
  }

  async findStudentByEmail(email: string) {
    const student = await this.studentModel
      .findOne() // Perform a query on the Student collection
      .populate({
        path: 'user', // Join with the User collection
        match: email,
        select: 'name email role', // Specify which fields to return
      });

    if (!student || !student.user) {
      throw new NotFoundException('Student with this email not found');
    }

    return student;
  }
}



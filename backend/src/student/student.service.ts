import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

    try {
      return student.save();

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findStudentByEmail(email: string) {
    const user = await this.authModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException("There is no user with this email")
    }
    const student = await this.studentModel
      .findOne({ user: user._id }) // Perform a query on the Student collection
      .populate({
        path: 'user', // Join with the User collection
        select: 'name email role', // Specify which fields to return
      });
    if (!student) {
      throw new NotFoundException('Student with this email not found');
    }

    return student;
  }

  // delete a student document
  async deleteStudent(studentId: string) {
    const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }
    return deletedStudent;
  }

  // get all students
  async getAllStudents(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }
}



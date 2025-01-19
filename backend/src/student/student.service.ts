import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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



}

// Time Table

export class TimetableService {
  constructor(

    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) { }

  async updateTimeTable(id: string, timetableData: Record<string, Record<string, string>>) {
    const student = await this.studentModel.findById(id);
    if (!student) throw new NotFoundException('Student not found');

    // Convert Record<string, Record<string, string>> to Map<string, Map<string, string>>
    const convertedTimetable = new Map<string, Map<string, string>>();
    for (const day in timetableData) {
      const dayMap = new Map<string, string>(Object.entries(timetableData[day]));
      convertedTimetable.set(day, dayMap);
    }

    student.timetable = convertedTimetable; // Now it matches the type
    await student.save();

    return { message: 'Timetable updated successfully', timetable: student.timetable };
  }


  async getStudentTimeTable(id: string) {

    const student = await this.studentModel.findById(id);
    if (!student) throw new NotFoundException('Student not found');


    return this.formatTimetableForFrontend(student.timetable);
  }


  createEmptyTimetable(): Map<string, Map<string, string>> {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const times = [
      "9:00-9:50",
      "10:00-10:50",
      "11:00-11:50",
      "1:00-1:50",
      "2:00-2:50",
      "3:00 -3:50",
      "4:00 -4:50"
    ];

    const timetable = new Map();
    for (const day of days) {
      const slots = new Map();
      times.forEach((time) => slots.set(time, null)); // Initialize slots with null
      timetable.set(day, slots);
    }
    return timetable;
  }

  formatTimetableForFrontend(
    timetable: Map<string, Map<string, string>>
  ): any[] {
    const days = Array.from(timetable.keys());
    const times = Array.from(timetable.values())[0]
      ? Array.from(timetable.values())[0].keys()
      : [];

    const rows = [];
    for (const time of times) {
      const row: any = { time };
      days.forEach((day) => {
        row[day] = timetable.get(day)?.get(time) || null;
      });
      rows.push(row);
    }

    return rows;
  }
}
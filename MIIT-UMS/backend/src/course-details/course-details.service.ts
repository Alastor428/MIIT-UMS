import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDetails } from './schemas/course-details.schema';

@Injectable()
export class CourseDetailsService {
  constructor(
    @InjectModel(CourseDetails.name) private readonly courseModel: Model<CourseDetails>,
  ) { }

  async getCourseByStudentIdAndCourseCode(studentId: string, courseCode: string) {
    return this.courseModel.findOne({ studentId, courseCode });
  }

  async createCourseForStudent(studentId: string, courseData: Partial<CourseDetails>) {
    const newCourse = new this.courseModel({
      studentId,
      ...courseData,
    });
    return await newCourse.save();
  }

  async deleteCourseFromStudent(studentId: string, courseCode: string) {
    return this.courseModel.deleteOne({ studentId, courseCode });
  }

  async updateCourseForStudent(studentId: string, courseCode: string, updateData: Partial<CourseDetails>) {
    return this.courseModel.updateOne({ studentId, courseCode }, { $set: updateData });
  }

}

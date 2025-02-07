import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from 'src/teacher/models/teacher.model';
import { GetAllTeachersDto } from 'src/teacher/dto/getAllTeachers.dto';

@Injectable()
export class GetAllTeachers {
  constructor(
    @InjectModel(Teacher.name) private teacherModal: Model<TeacherDocument>,
  ) {}

  async getAllTeachers(
    authId: string,
    offset: number,
    limit: number,
    search: string,
  ): Promise<GetAllTeachersDto> {
    try {
      const totalCount = await this.teacherModal.countDocuments({}).exec();
      let query = {};
      console.log(search);
      if (search) {
        query = {
          name: { $regex: search, $options: 'i' },
        };
      }
      const teachers = await this.teacherModal
        .find(query)
        .skip(offset)
        .limit(limit)
        .exec();

      return {
        totalCount,
        teachers,
      };
    } catch (error) {
      console.log(error, 'this is get All teachers errors');
      console.error('Error fetching teachers:', error);
      throw new InternalServerErrorException('Error fetching teachers');
    }
  }
}

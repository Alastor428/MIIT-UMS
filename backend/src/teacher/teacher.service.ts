import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ModifyResponse } from 'src/utils/constants/ModifyResponse.dto';
import { CreateTeacher } from './operations/mutation/createTeacher';
import { GetAllTeachers } from './operations/query/getAllTeachers';
import { GetAllTeachersDto } from './dto/getAllTeachers.dto';
import { Teacher } from './models/teacher.schema';
import { GetTeacher } from './operations/query/getTeacher';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { TeacherEventDto } from './dto/teacher-event.dto';
import { NotificationService } from './services/teacher-notification.service';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly teacherCreate: CreateTeacher,
    private readonly fetchAllTeachers: GetAllTeachers,
    private readonly fetchTeacher: GetTeacher,
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async createTeacher(
    userId: string,
    input: CreateTeacherDto
  ): Promise<ModifyResponse> {
    return await this.teacherCreate.createTeacher(userId, input)
  }

  // Get teacher by user id
  async getTeacherByUserId(userID: string) {
    const user = await this.userModel.findById(userID);
    if (!user) {
      throw new NotFoundException("User NOT FOUND");

    }
    const objectId = new mongoose.Types.ObjectId(userID);
    const teacher = await this.teacherModel.findOne({ user: objectId }).populate({
      path: 'user',
      select: 'name email'
    });
    return {
      message: 'Success',
      teacher
    }
  }


  async getTeacherBydepartment(dept: string) {
    const teachers = await this.teacherModel.find({ department: dept }).select('shortName isHOD department').populate({
      path: 'user',
      select: 'name email'
    })
    if (teachers.length == 0) {
      throw new NotFoundException("teachers NOT FOUND")
    }

    return {
      message: "Success",
      teachers
    }
  }


  async updateTeacher(userId: string, updateData: UpdateTeacherDto): Promise<Teacher> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const teacher = await this.teacherModel.findOne({ user: user._id });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    // Update both the teacher and user info if needed
    if (updateData.name || updateData.email) {
      await this.userModel.findByIdAndUpdate(
        userId,
        {
          ...(updateData.name && { name: updateData.name }),
          ...(updateData.email && { email: updateData.email }),
        },
        { new: true }
      );
    }

    const updatedTeacher = await this.teacherModel.findOneAndUpdate(
      { user: user._id },
      {
        ...(updateData.department && { department: updateData.department }),
        ...(updateData.shortName && { shortName: updateData.shortName }),
        ...(updateData.isHOD !== undefined && { isHOD: updateData.isHOD }),
      },
      { new: true }
    ).populate({
      path: 'user',
      select: 'name email',
    });

    return updatedTeacher;
  }

  // async getAllTeachers(
  //   authId: string,
  //   offset: number,
  //   limit: number,
  //   search: string,
  // ): Promise<GetAllTeachersDto> {
  //   return await this.fetchAllTeachers.getAllTeachers(authId, offset, limit, search);
  // }

  async getAllTeachers() {
    return await this.fetchAllTeachers.getAllTeachers()
  }


  async getTeacher(email: string): Promise<Teacher> {
    return await this.fetchTeacher.getTeacher(email);
  }

  async deleteTeacher(teacherId: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(teacherId);
    const deletedTeacher = await this.teacherModel.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }
    const user = await this.userModel.findByIdAndDelete(teacher.user._id)
    if (!user) {
      console.log("User not found")
    } else {
      console.log("Deleted User : ", user)
    }
    return deletedTeacher;
  }


  async createEvent(teacherId: string, event: TeacherEventDto): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(teacherId).exec();

    if (!teacher) {
      throw new Error('Teacher not found');
    }

    // Add the event to the teacher's event list
    teacher.event.push(event);
    await teacher.save();

    // Send notification to the designated batch
    await this.notificationService.sendEventNotification(event);

    return teacher;
  }


}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { CourseDetails } from '../schemas/course-details.schema';
import { ToDoListDto } from '../dto/to-do-list.dto';
import { TeacherEventDto } from '../dto/teacher-event.dto';

@Schema({
  timestamps: true,
})
export class Teacher extends Document {
  @Prop({ required: true, unique: true })
  shortName: string

  @Prop({
    type: Map,
    of: Map,
    default: () => new Map(),
  })
  timetable: Map<string, Map<string, string>>; // Stores course _id references

  @Prop({ type: [CourseDetails], default: [] }) // Array of course details
  course_details: CourseDetails[];

  @Prop({ required: true })
  department: string;

  @Prop({ default: false })
  isHOD: boolean;

  @Prop({ type: [TeacherEventDto], default: [] })
  event: TeacherEventDto[];

  @Prop({ type: [ToDoListDto], default: [] })
  todo_list: ToDoListDto[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
export interface TeacherDocument extends Teacher, Document {
  createdAt: Date;
  updatedAt: Date;
  _id: mongoose.Types.ObjectId;
}

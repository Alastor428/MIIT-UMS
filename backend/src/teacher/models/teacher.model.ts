import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Teacher {

  @Prop({ required: true })
  name: string;

  @Prop()
  profileImage: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['MALE', 'FEMALE', 'OTHER'], default: 'MALE' })
  gender: string;

  @Prop({ required: true })
  department: string;

  @Prop({ default: false })
  isHOD: boolean;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
export interface TeacherDocument extends Teacher, Document {
  createdAt: Date;
  updatedAt: Date;
  _id: mongoose.Types.ObjectId;
}

import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Student extends Document {

    @Prop({ required: true })
    batch: string

    @Prop({ type: [String], default: [] })
    timetable: string[];

    // Will be deleted later if not needed. Added for testing
    @Prop({ type: [String], default: [] })
    events: string[];

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}

export const studentSchema = SchemaFactory.createForClass(Student)
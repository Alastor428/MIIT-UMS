import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { CourseDetails } from "src/course-details/schemas/course-details.schema";
import { ToDoListDto } from "../dto/todolist.dto";
@Schema()
export class Student extends Document {
    @Prop({ required: true })
    batch: string;

    @Prop({ required: true, unique: true })
    roll_no: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({
        type: Map,
        of: Map,
        default: () => new Map(),
    })
    timetable: Map<string, Map<string, string>>; // Stores course _id references

    @Prop({ type: [CourseDetails], default: [] }) // Array of course details
    course_details: CourseDetails[];

    @Prop({ type: [String], default: [] })
    events: string[];

    @Prop({ type: [ToDoListDto], default: [] })
    todo_list: ToDoListDto[];

}


export const studentSchema = SchemaFactory.createForClass(Student);
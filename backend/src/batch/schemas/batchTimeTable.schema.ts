import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class BatchTimeTable extends Document {
    @Prop({ required: true, unique: true })
    batch: string;

    @Prop({ required: true })
    createdBy: string;

    @Prop([{
        time: String,
        Monday: { type: Types.ObjectId, ref: 'CourseDetails' },
        Tuesday: { type: Types.ObjectId, ref: 'CourseDetails' },
        Wednesday: { type: Types.ObjectId, ref: 'CourseDetails' },
        Thursday: { type: Types.ObjectId, ref: 'CourseDetails' },
        Friday: { type: Types.ObjectId, ref: 'CourseDetails' },
    }])
    timetable: Array<{
        time: string;
        Monday: Types.ObjectId;
        Tuesday: Types.ObjectId;
        Wednesday: Types.ObjectId;
        Thursday: Types.ObjectId;
        Friday: Types.ObjectId;
    }>;

    // New Prop for course_details
    @Prop([{
        courseCode: String,
        courseName: String,
        instructor: String,
        room: String,
        credit: Number,
        faculty: String,
        note: String,
        _id: Types.ObjectId, // Store the _id for reference
    }])
    course_details: Array<{
        courseCode: string;
        courseName: string;
        instructor: string;
        room: string;
        credit: number;
        faculty: string;
        note: string;
        _id: Types.ObjectId;
    }>;
}

export const BatchTimeTableSchema = SchemaFactory.createForClass(BatchTimeTable);
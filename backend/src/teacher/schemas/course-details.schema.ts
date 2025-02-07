import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class CourseDetails extends Document {
    @Prop({ required: true })
    courseCode: string;

    @Prop()
    courseName: string;

    @Prop()
    room: string;

    @Prop()
    credit: number;

    @Prop()
    note: string;

}
export const CourseDetailsSchema = SchemaFactory.createForClass(CourseDetails);
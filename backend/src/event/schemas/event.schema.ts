import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Priority {
    High = "high",
    Low = "low"
}

@Schema()
export class Event extends Document {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop()
    details: string;

    @Prop()
    time: string;

    @Prop()
    sender: string;

    @Prop()
    date: Date;

    @Prop()
    place: string;

    @Prop({ type: String, enum: Object.values(Priority), required: true })
    priority: Priority;
}
export const eventSchema = SchemaFactory.createForClass(Event);
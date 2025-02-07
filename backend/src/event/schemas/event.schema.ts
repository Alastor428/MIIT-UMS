import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Event extends Document {
    @Prop({ required: true })
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

    @Prop()
    priority: string;
}
export const eventSchema = SchemaFactory.createForClass(Event);
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum UserRole {
    Student = "student",
    Teacher = "teacher",
    Admin = "admin"
}

export enum Gender {
    Male = "male",
    Female = "female"
}

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: UserRole })
    role: UserRole;

    @Prop({ required: true, enum: Gender })
    gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
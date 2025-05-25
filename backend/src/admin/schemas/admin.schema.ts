import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/auth/schemas/user.schema";

export enum AdminRole {
    SUPER = "super",
    STANDARD = "standard",
}

@Schema()
export class Admin extends Document {
    @Prop({ enum: AdminRole })
    adminRole: AdminRole

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}

export const adminSchema = SchemaFactory.createForClass(Admin);
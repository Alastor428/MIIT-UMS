import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Teacher } from "../models/teacher.schema";
import { Model } from "mongoose";

@Injectable()
export class TeacherEventService {
    constructor(
        @InjectModel(Teacher.name) private teacherModel: Model<Teacher>
    ) { }

    async createEvent() {

    }
}
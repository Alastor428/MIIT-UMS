import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TeacherEventDto } from '../dto/teacher-event.dto';
import { Student } from 'src/student/schemas/student.schema';
import { EventsGateway } from 'src/gateways/teacher-event.gateway';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<Student>,
        private eventsGateway: EventsGateway,
    ) { }

    async sendEventNotification(event: TeacherEventDto): Promise<void> {
        try {
            const { batch } = event;
            const students = await this.studentModel.find({ batch }).exec();
            students.forEach((student) => {
                this.sendMessageToStudent(student.user, event);
            });
        } catch (error) {
            console.error('Error sending event notification:', error.message);
        }
    }

    private sendMessageToStudent(userId: Types.ObjectId, event: TeacherEventDto): void {
        try {
            this.eventsGateway.server.to(userId.toString()).emit('newEvent', event);
        } catch (error) {
            console.error('Error sending message to student:', error.message);
        }
    }

}
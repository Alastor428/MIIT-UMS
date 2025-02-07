import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Teacher } from '../models/teacher.model';
import { CourseDetails } from '../schemas/course-details.schema';
import { AddCourseToTimetableDto } from '../dto/teacher-timetable.dto';

@Injectable()
export class TeacherTimetableService {
    constructor(
        @InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
    ) { }

    // Add a course to the teacher's timetable
    async addCourseToTimetable(
        teacherId: string,
        timetableData: AddCourseToTimetableDto,
    ) {
        const { day, time, courseCode, courseName, room, credit, note } = timetableData;
        const teacher = await this.teacherModel.findById(teacherId);
        if (!teacher) {
            throw new NotFoundException('teacher not found');
        }
        let course = teacher.course_details.find((c) => c.courseCode === courseCode);

        if (!course) {
            course = {
                _id: new Types.ObjectId(),
                courseCode,
                courseName,
                room,
                credit,
                note,
            } as CourseDetails;
            teacher.course_details.push(course);
        }


        if (!teacher.timetable) {
            teacher.timetable = new Map<string, Map<string, string>>();
        }

        let dayMap = teacher.timetable.get(day);
        if (!dayMap) {
            dayMap = new Map<string, string>();
            teacher.timetable.set(day, dayMap);
        }

        dayMap.set(time, course._id.toString());
        teacher.timetable.set(day, dayMap);

        teacher.markModified('timetable');

        await teacher.save();

        return {
            message: 'Course added to timetable successfully',
            course,
        };
    }

    // Edit course
    async editCourse(
        teacherId: string,
        oldCourseCode: string,
        updatedData: Partial<CourseDetails>,
    ) {
        const teacher = await this.teacherModel.findById(teacherId);
        if (!teacher) {
            throw new NotFoundException('teacher not found');
        }

        var courseId = null;
        const oldCourse = teacher.course_details
        for (let index = 0; index < oldCourse.length; index++) {
            const oldcourseId = oldCourse[index];
            if (oldcourseId.courseCode === oldCourseCode) {
                courseId = oldcourseId._id;
                break;
            }
        }

        const course = teacher.course_details.find((c) => c._id === courseId);
        if (!course) {
            throw new NotFoundException('Course not found');
        }

        Object.assign(course, updatedData);

        await teacher.save();

        return {
            message: 'Course updated successfully',
            course,
        };
    }

    // Delete courses
    async deleteCourse(
        teacherId: string,
        courseId: string,
    ) {
        const teacher = await this.teacherModel.findById(teacherId);
        if (!teacher) {
            throw new NotFoundException('teacher not found');
        }

        teacher.course_details = teacher.course_details.filter((c) => c._id.toString() !== courseId);

        for (const [day, dayMap] of teacher.timetable) {
            for (const [time, courseRef] of dayMap) {
                if (courseRef === courseId) {
                    dayMap.set(time, null);
                }
            }
            teacher.timetable.set(day, dayMap);
        }

        teacher.markModified('timetable');
        await teacher.save();

        return {
            message: 'Course deleted successfully',
        };
    }


    async getTeacherTimetable(teacherId: string) {
        const teacher = await this.teacherModel.findById(teacherId);
        if (!teacher) {
            throw new NotFoundException('teacher not found');
        }

        const formattedTimetable = this.formatTimetableForFrontend(teacher.timetable, teacher.course_details);

        return {
            timetable: formattedTimetable,
            course_details: teacher.course_details,
        };
    }

    formatTimetableForFrontend(
        timetable: Map<string, Map<string, string>>,
        courseDetails: CourseDetails[],
    ): any[] {
        // Define all days of the week
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        // Define all time slots
        const times = [
            '9:00-9:50',
            '10:00-10:50',
            '11:00-11:50',
            '1:00-1:50',
            '2:00-2:50',
            '3:00-3:50',
            '4:00-4:50',
        ];

        const rows = [];
        for (const time of times) {
            const row: any = { time };
            for (const day of days) {
                // Get the course ID for the current day and time
                const courseId = timetable.get(day)?.get(time);

                // Find the course details for the course ID
                const course = courseDetails.find((c) => c._id.toString() === courseId);

                // Add the course (or null if no course exists) to the row
                row[day] = course || null;
            }
            rows.push(row);
        }

        return rows;
    }

    // Reset Time Table to null
    async resetTimetable(teacherId: string): Promise<{ message: string; timetable: Map<string, Map<string, string>> }> {
        const teacher = await this.teacherModel.findById(teacherId);

        if (!teacher) {
            throw new NotFoundException('teacher not found');
        }
        const emptyTimetable = this.createEmptyTimetable();
        teacher.timetable = emptyTimetable;

        teacher.markModified('timetable');

        await teacher.save();

        return {
            message: 'Timetable reset successfully',
            timetable: emptyTimetable,
        };
    }

    createEmptyTimetable(): Map<string, Map<string, string>> {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const times = [
            '9:00-9:50',
            '10:00-10:50',
            '11:00-11:50',
            '1:00-1:50',
            '2:00-2:50',
            '3:00-3:50',
            '4:00-4:50',
        ];

        const timetable = new Map<string, Map<string, string>>();

        for (const day of days) {
            const slots = new Map<string, string>();
            for (const time of times) {
                slots.set(time, null);
            }
            timetable.set(day, slots);
        }

        return timetable;
    }

    // Delete a time table cell
    async deleteTimetableCell(
        teacherId: string,
        day: string,
        time: string,
    ): Promise<{ message: string; timetable: Map<string, Map<string, string>> }> {

        const teacher = await this.teacherModel.findById(teacherId);
        if (!teacher) {
            throw new NotFoundException('teacher not found');
        }

        const dayMap = teacher.timetable.get(day);
        if (!dayMap) {
            throw new NotFoundException(`No timetable entry found for the day: ${day}`);
        }

        if (!dayMap.has(time)) {
            throw new NotFoundException(`No timetable entry found for time: ${time} on ${day}`);
        }

        dayMap.set(time, null);

        teacher.markModified('timetable');

        await teacher.save();

        return {
            message: `Time slot cleared for ${day} at ${time}`,
            timetable: teacher.timetable,
        };
    }

    // Add an Existing course to the time table with smaller requeest body
    async addExistingCourseToTimetable(
        teacherId: string,
        day: string,
        time: string,
        courseCode: string,
    ): Promise<{ message: string; timetable: Map<string, Map<string, string>> }> {
        const teacher = await this.teacherModel.findById(teacherId);
        if (!teacher) {
            throw new NotFoundException('teacher not found');
        }

        const course = teacher.course_details.find((c) => c.courseCode === courseCode);
        if (!course) {
            throw new NotFoundException(`Course with code ${courseCode} not found in teacher's course details`);
        }

        if (!teacher.timetable) {
            teacher.timetable = new Map<string, Map<string, string>>();
        }

        let dayMap = teacher.timetable.get(day);
        if (!dayMap) {
            dayMap = new Map<string, string>();
            teacher.timetable.set(day, dayMap);
        }

        dayMap.set(time, course._id.toString());
        teacher.timetable.set(day, dayMap);

        teacher.markModified('timetable');

        await teacher.save();

        return {
            message: `Course ${courseCode} added to timetable for ${day} at ${time}`,
            timetable: teacher.timetable,
        };
    }
}

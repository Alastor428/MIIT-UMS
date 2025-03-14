import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo, Types } from 'mongoose';
import { Student } from '../schemas/student.schema';
import { CourseDetails } from 'src/course-details/schemas/course-details.schema';
import { AddCourseToTimetableDto } from '../dto/student-timetable.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class TimetableService {
    constructor(
        @InjectModel(Student.name) private readonly studentModel: Model<Student>,
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    // Add a course to the student's timetable
    async addCourseToTimetable(
        studentId: string,
        timetableData: AddCourseToTimetableDto,
    ) {
        const { day, time, courseCode, courseName, instructor, room, credit, faculty, note } = timetableData;
        const student = await this.studentModel.findById(studentId);
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        // Ensure timetable is initialized as a Map
        if (!student.timetable) {
            student.timetable = new Map<string, Map<string, string>>();
        }

        // Find or create the course in course_details
        let course = student.course_details.find((c) => c.courseCode === courseCode);
        if (!course) {
            course = {
                _id: new Types.ObjectId(),
                courseCode,
                courseName,
                instructor,
                room,
                credit,
                faculty,
                note,
            } as CourseDetails;
            student.course_details.push(course);
        }

        // Initialize the day map if it doesn't exist
        let dayMap = student.timetable.get(day);
        if (!dayMap) {
            dayMap = new Map<string, string>();
            student.timetable.set(day, dayMap);
        }

        // Add the course to the timetable
        dayMap.set(time, course._id.toString());
        student.timetable.set(day, dayMap); // Re-set to trigger change tracking

        // Mark the timetable field as modified
        student.markModified('timetable');

        // Save the updated student document
        await student.save();

        return {
            message: 'Course added to timetable successfully',
            course,
        };
    }


    // Edit course
    async editCourse(
        userId: string,
        oldCourseCode: string,
        updatedData: Partial<CourseDetails>,
    ) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException("User Not Found");

        }
        const objectId = new mongoose.Types.ObjectId(userId)
        const student = await this.studentModel.findOne({ user: objectId });
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        var courseId = null;
        const oldCourse = student.course_details
        for (let index = 0; index < oldCourse.length; index++) {
            const oldcourseId = oldCourse[index];
            if (oldcourseId.courseCode === oldCourseCode) {
                courseId = oldcourseId._id;
                break;
            }
        }

        const course = student.course_details.find((c) => c._id === courseId);
        if (!course) {
            throw new NotFoundException('Course not found');
        }

        Object.assign(course, updatedData);

        await student.save();

        return {
            message: 'Course updated successfully',
            course,
        };

    }

    // Delete courses
    async deleteCourse(
        userId: string,
        courseId: string,
    ) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException("User Not Found");
        }
        const objectId = new mongoose.Types.ObjectId(userId)
        const student = await this.studentModel.findOne({ user: objectId });
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        student.course_details = student.course_details.filter((c) => c._id.toString() !== courseId);

        for (const [day, dayMap] of student.timetable) {
            for (const [time, courseRef] of dayMap) {
                if (courseRef === courseId) {
                    dayMap.set(time, null);
                }
            }
            student.timetable.set(day, dayMap);
        }

        student.markModified('timetable');
        await student.save();

        return {
            message: 'Course deleted successfully',
        };
    }


    // Get student time table
    async getStudentTimetable(userId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException("User Not Found");

        }
        const objectId = new mongoose.Types.ObjectId(userId)
        const student = await this.studentModel.findOne({ user: objectId });
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        const formattedTimetable = this.formatTimetableForFrontend(student.timetable, student.course_details);

        return {
            timetable: formattedTimetable,
            course_details: student.course_details,
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
    async resetTimetable(userId: string): Promise<{ message: string; timetable: Map<string, Map<string, string>> }> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException("User Not Found");
        }
        const objectId = new mongoose.Types.ObjectId(userId);
        const student = await this.studentModel.findOne({ user: objectId });

        if (!student) {
            throw new NotFoundException('Student not found');
        }
        const emptyTimetable = this.createEmptyTimetable();
        student.timetable = emptyTimetable;

        student.markModified('timetable');

        await student.save();

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

    // Add multiple entries to the timetable
    async addMultipleTimetableEntries(
        studentId: string,
        requestBody: {
            timetable: Array<{
                time: string;
                Monday: any;
                Tuesday: any;
                Wednesday: any;
                Thursday: any;
                Friday: any;
            }>;
            course_details: Array<{
                courseCode: string;
                courseName: string;
                instructor: string;
                room: string;
                credit: number;
                faculty: string;
                note: string;
                _id: string;
            }>;
        },
    ): Promise<{ message: string }> {
        const { timetable, course_details } = requestBody;

        const student = await this.studentModel.findById(studentId);
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        // Step 1: Update course_details
        for (const courseDetail of course_details) {
            const existingCourse = student.course_details.find(
                (c) => c.courseCode.trim() === courseDetail.courseCode.trim() &&
                    c._id === courseDetail._id
            );

            if (!existingCourse) {
                var oldCourse = student.course_details.find((c) => c.courseCode.trim() === courseDetail.courseCode.trim())
                // Create a new course document using the CourseDetails schema
                if (!oldCourse) {
                    const newCourse = {
                        _id: courseDetail._id,
                        courseCode: courseDetail.courseCode,
                        courseName: courseDetail.courseName,
                        instructor: courseDetail.instructor,
                        room: courseDetail.room,
                        credit: courseDetail.credit,
                        faculty: courseDetail.faculty,
                        note: courseDetail.note,
                    };
                    student.course_details.push(newCourse as any);
                }
                else {

                    oldCourse._id = courseDetail._id,
                        oldCourse.courseCode = courseDetail.courseCode,
                        oldCourse.courseName = courseDetail.courseName,
                        oldCourse.instructor = courseDetail.instructor,
                        oldCourse.room = courseDetail.room,
                        oldCourse.credit = courseDetail.credit,
                        oldCourse.faculty = courseDetail.faculty,
                        oldCourse.note = courseDetail.note

                }

            }
        }

        // Step 2: Update timetable
        for (const timetableEntry of timetable) {
            const { time, Monday, Tuesday, Wednesday, Thursday, Friday } = timetableEntry;

            // Helper function to update a specific day's timetable
            const updateDayTimetable = (day: string, course: any) => {
                if (course) {
                    const dayMap = student.timetable.get(day) || new Map<string, string>();
                    dayMap.set(time, course._id.toString());
                    student.timetable.set(day, dayMap);
                }
            };

            // Update each day's timetable
            updateDayTimetable('Monday', Monday);
            updateDayTimetable('Tuesday', Tuesday);
            updateDayTimetable('Wednesday', Wednesday);
            updateDayTimetable('Thursday', Thursday);
            updateDayTimetable('Friday', Friday);
        }

        // Mark the timetable and course_details as modified
        student.markModified('timetable');
        student.markModified('course_details');

        // Save the updated student document
        await student.save();

        return { message: 'Timetable and course details updated successfully' };
    }
    // Delete Single Timetable cell
    async deleteTimetableCell(
        userId: string,
        day: string,
        time: string,
    ): Promise<{ message: string; timetable: Map<string, Map<string, string>> }> {

        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException("User Not Found");
        }
        const objectId = new mongoose.Types.ObjectId(userId)
        const student = await this.studentModel.findOne({ user: objectId });
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        const dayMap = student.timetable.get(day);
        if (!dayMap) {
            throw new NotFoundException(`No timetable entry found for the day: ${day}`);
        }

        if (!dayMap.has(time)) {
            throw new NotFoundException(`No timetable entry found for time: ${time} on ${day}`);
        }

        dayMap.set(time, null);

        student.markModified('timetable');

        await student.save();

        return {
            message: `Time slot cleared for ${day} at ${time}`,
            timetable: student.timetable,
        };
    }

    // Add an Existing course to the time table with smaller requeest body
    async addExistingCourseToTimetable(
        studentId: string,
        day: string,
        time: string,
        courseCode: string,
    ): Promise<{ message: string; timetable: Map<string, Map<string, string>> }> {
        const student = await this.studentModel.findById(studentId);
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        const course = student.course_details.find((c) => c.courseCode === courseCode);
        if (!course) {
            throw new NotFoundException(`Course with code ${courseCode} not found in student's course details`);
        }

        if (!student.timetable) {
            student.timetable = new Map<string, Map<string, string>>();
        }

        let dayMap = student.timetable.get(day);
        if (!dayMap) {
            dayMap = new Map<string, string>();
            student.timetable.set(day, dayMap);
        }

        dayMap.set(time, course._id.toString());
        student.timetable.set(day, dayMap);

        student.markModified('timetable');

        await student.save();

        return {
            message: `Course ${courseCode} added to timetable for ${day} at ${time}`,
            timetable: student.timetable,
        };
    }
}

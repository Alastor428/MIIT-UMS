import { Schema, Document } from 'mongoose';
export interface TimetableEntry {
    day: string;  // Day of the week (e.g., Monday, Tuesday)
    time: string; // Timeslot (e.g., "10:00 AM")
    courseCode: string; // Unique code for the course
    courseName: string; // Name of the course
    instructor: string; // Instructor's name
}

export interface Timetable extends Document {
    studentId: string; // The student to whom this timetable belongs
    timetable: TimetableEntry[]; // List of timetable entries for the student
}

export const TimetableSchema = new Schema<Timetable>(
    {
        studentId: { type: String, required: true },
        timetable: [
            {
                day: { type: String, required: true },
                time: { type: String, required: true },
                courseCode: { type: String, required: true },
                courseName: { type: String, required: true },
                instructor: { type: String, required: true },
            },
        ],
    },
    { timestamps: true }
);

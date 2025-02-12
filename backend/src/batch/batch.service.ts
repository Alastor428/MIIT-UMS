import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { BatchTimeTable } from './schemas/batchTimeTable.schema';
import { CourseDetails } from 'src/student/schemas/course.schema';

@Injectable()
export class BatchTimetableService {
  constructor(
    @InjectModel(BatchTimeTable.name) private readonly batchTimetableModel: Model<BatchTimeTable>,
    @InjectModel(CourseDetails.name) private readonly courseDetailsModel: Model<CourseDetails>,
  ) { }
  async upsertBatchTimetable(
    batch: string,
    createdBy: string,
    timetableData: Array<{ time: string;[day: string]: any }>,
    courseDetails: any[],
  ) {
    // Find or create the batch timetable
    let batchTimetable = await this.batchTimetableModel.findOne({ batch });
    if (!batchTimetable) {
      batchTimetable = new this.batchTimetableModel({ batch, createdBy, timetable: [], course_details: [] });
    } else {
      batchTimetable.createdBy = createdBy; // Update createdBy if the timetable already exists
    }

    // Clear the existing timetable and course_details
    batchTimetable.timetable = [];
    batchTimetable.course_details = [];

    // Update the timetable
    for (const row of timetableData) {
      const { time, ...days } = row;
      const timetableRow: any = { time }; // Ensure time is included

      for (const [day, courseDetailsForSlot] of Object.entries(days)) {
        if (courseDetailsForSlot) {
          // Find the course in the course_details array
          const course = courseDetails.find((c) => c.courseCode === courseDetailsForSlot.courseCode);
          if (!course) {
            throw new NotFoundException(`Course with code ${courseDetailsForSlot.courseCode} not found in course_details`);
          }
          timetableRow[day] = new Types.ObjectId(course._id); // Store the course reference
        } else {
          timetableRow[day] = null; // No course for this day and time slot
        }
      }

      batchTimetable.timetable.push(timetableRow);
    }

    // Update the course_details
    batchTimetable.course_details = courseDetails.map((course) => ({
      ...course,
      _id: new Types.ObjectId(course._id), // Ensure _id is a valid ObjectId
    }));

    // Save the batch timetable
    await batchTimetable.save();

    return {
      message: 'Batch timetable updated successfully',
      batchTimetable,
    };
  }

  async getBatchTimetable(batch: string) {
    // Find the batch timetable
    const batchTimetable = await this.batchTimetableModel
      .findOne({ batch })
      .lean(); // Use .lean() for better performance

    if (!batchTimetable) {
      throw new NotFoundException(`Timetable for batch ${batch} not found`);
    }

    // Create a map of course IDs to course details
    const courseMap = new Map<string, any>();
    for (const course of batchTimetable.course_details) {
      courseMap.set(course._id.toString(), course);
    }

    // Format the timetable to include populated course details
    const formattedTimetable = batchTimetable.timetable.map((row) => {
      const formattedRow: any = { time: row.time };
      for (const day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']) {
        formattedRow[day] = row[day] ? courseMap.get(row[day].toString()) : null;
      }
      return formattedRow;
    });

    return {
      timetable: formattedTimetable,
      course_details: batchTimetable.course_details,
    };
  }

  // SUCCESS:
  async processAndSortTimetableFromCSV(filePath: string): Promise<{ timetable: any[]; course_details: any[] }> {
    const timetableData: Array<{ time: string;[day: string]: any }> = [];
    const courseDetailsMap = new Map<string, any>();
    const csvRows: any[] = []; // Store all rows temporarily

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          const trimmedRow = Object.keys(row).reduce((acc, key) => {
            acc[key.trim()] = row[key]?.trim(); // Trim keys and values
            return acc;
          }, {} as any);

          csvRows.push(trimmedRow); // Store the row for later processing

          // Extract course details
          const { courseCode, courseName, instructor, room, credit, faculty, note } = trimmedRow;
          if (courseCode) {
            const normalizedCourseCode = courseCode.trim(); // Normalize course code
            if (!courseDetailsMap.has(normalizedCourseCode)) {
              courseDetailsMap.set(normalizedCourseCode, {
                courseCode,
                courseName,
                instructor,
                room,
                credit: parseInt(credit, 10),
                faculty,
                note,
                _id: new Types.ObjectId(), // Generate a new ObjectId for the course
              });
            }
          }
        })
        .on('end', () => {
          // Now process timetable data using stored course details
          csvRows.forEach((trimmedRow) => {
            const { time } = trimmedRow;
            const timetableEntry: any = { time };
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

            days.forEach(day => {
              const courseCode = trimmedRow[day]?.trim(); // Get the course code from the day column
              timetableEntry[day] = courseCode ? courseDetailsMap.get(courseCode) : null; // Lookup the course
            });

            timetableData.push(timetableEntry);
          });

          // Sort the timetable data by time
          timetableData.sort((a, b) => {
            const timeA = a.time ? a.time.split(':').map(Number) : [0, 0]; // Default to [0, 0] if time is invalid
            const timeB = b.time ? b.time.split(':').map(Number) : [0, 0]; // Default to [0, 0] if time is invalid
            return timeA[0] - timeB[0] || timeA[1] - timeB[1];
          });

          // Convert courseDetailsMap to an array
          const courseDetails = Array.from(courseDetailsMap.values());

          resolve({ timetable: timetableData, course_details: courseDetails });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

}
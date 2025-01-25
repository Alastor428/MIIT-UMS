import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    console.log('Incoming Timetable Data:', timetableData);
    console.log('Incoming Course Details:', courseDetails);

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
      const timetableRow: any = { time };

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

    console.log('Batch Timetable Before Saving:', batchTimetable);

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
}
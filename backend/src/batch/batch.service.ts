import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { BatchTimeTable } from './schemas/batchTimeTable.schema';
import { StudentService } from 'src/student/student.service';
import { TimetableService } from 'src/student/services/student-timetable.service';
import { TeacherTimetableService } from 'src/teacher/services/teacher-timetable.service';
import { CourseDetails } from 'src/teacher/schemas/course-details.schema';

@Injectable()
export class BatchTimetableService {
  constructor(
    private readonly studentService: StudentService,
    private readonly timetableService: TimetableService,
    private readonly teachertimetableService: TeacherTimetableService,
    @InjectModel(BatchTimeTable.name) private readonly batchTimetableModel: Model<BatchTimeTable>,
  ) { }

  // Method to update student timetables when the batch timetable is updated
  private async updateStudentTimetables(batch: string, timetableData: any[], courseDetails: any[]) {
    const students = await this.studentService.getStudentsByBatch(batch);

    for (const student of students) {
      await this.timetableService.addMultipleTimetableEntries(student._id.toString(), {
        timetable: timetableData,
        course_details: courseDetails,
      });
    }
  }
  // Method to update teacher timetables based on the courses they teach
  private async updateTeacherTimetables(batch: string, courseDetailsForTeachers: any[], timetableData: any[]) {
    await this.teachertimetableService.addMultipleTimetableEntries(batch, courseDetailsForTeachers, timetableData);
  }


  // Upsert Batch Time Table
  async upsertBatchTimetable(
    batch: string,
    createdBy: string,
    timetableData: Array<{ time: string;[day: string]: any }>,
    courseDetailsForStudents: any[],
    courseDetailsForTeachers: any[],
  ) {
    let batchTimetable = await this.batchTimetableModel.findOne({ batch });
    if (!batchTimetable) {
      batchTimetable = new this.batchTimetableModel({ batch, createdBy, timetable: [], course_details: [] });
    } else {
      batchTimetable.createdBy = createdBy;
    }

    batchTimetable.timetable = [];
    batchTimetable.course_details = [];

    // First, update the course details for students
    const courseDetailsMapForStudents = new Map<string, any>();
    for (const course of courseDetailsForStudents) {
      // Store course details with _id
      courseDetailsMapForStudents.set(course.courseCode.trim(), {
        ...course,
        _id: new Types.ObjectId(course._id), // Ensure _id is updated for reference
      });
    }

    // Now, update the timetable rows
    for (const row of timetableData) {
      const { time, ...days } = row;
      const timetableRow: any = { time };

      let isEmptyRow = true;

      for (const [day, courseDetailsForSlot] of Object.entries(days)) {
        if (courseDetailsForSlot) {
          const course = courseDetailsMapForStudents.get(courseDetailsForSlot.courseCode.trim());
          if (!course) {
            throw new NotFoundException(`Course with code ${courseDetailsForSlot.courseCode} not found in course_details`);
          }
          timetableRow[day] = new Types.ObjectId(course._id); // Use ObjectId for reference
          isEmptyRow = false;
        } else {
          timetableRow[day] = null;
        }
      }

      if (!isEmptyRow) {
        batchTimetable.timetable.push(timetableRow);
      }
    }

    // Now process the course details for teachers (ensure correct mapping)
    const courseDetailsMapForTeachers = new Map<string, any>();
    for (const course of courseDetailsForTeachers) {
      const uniqueKey = `${course.courseCode.trim()}-${batch}`;
      courseDetailsMapForTeachers.set(uniqueKey, {
        ...course,
        _id: new Types.ObjectId(course._id),
        batch, // Include batch for teacher-specific course details
      });
    }

    batchTimetable.course_details = Array.from(courseDetailsMapForStudents.values());

    // Save the batch timetable (including updated course details)
    if (batchTimetable.timetable.length > 0 || batchTimetable.course_details.length > 0) {
      await batchTimetable.save();

      // Update student timetables
      await this.updateStudentTimetables(batch, batchTimetable.timetable, batchTimetable.course_details);

      // Update teacher timetables
      const updatedTimetableData = timetableData.map((row) => {
        const updatedRow: any = { time: row.time };
        for (const day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']) {
          const courseCode = row[day]?.courseCode?.trim();
          if (courseCode && courseDetailsMapForTeachers.has(`${courseCode}-${batch}`)) {
            updatedRow[day] = courseDetailsMapForTeachers.get(`${courseCode}-${batch}`)._id;
          } else {
            updatedRow[day] = null;
          }
        }
        return updatedRow;
      });

      await this.updateTeacherTimetables(batch, courseDetailsForTeachers, updatedTimetableData);

      return {
        message: 'Batch timetable updated successfully',
        batchTimetable,
      };
    } else {
      return {
        message: 'No timetable or course details to update',
      };
    }
  }


  // Get batch timetable
  async getBatchTimetable(batch: string) {
    const batchTimetable = await this.batchTimetableModel
      .findOne({ batch })
      .lean();

    if (!batchTimetable) {
      throw new NotFoundException(`Timetable for batch ${batch} not found`);
    }

    const courseMap = new Map<string, any>();
    for (const course of batchTimetable.course_details) {
      courseMap.set(course._id.toString(), course);
    }

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

  async getAllBatchTimetable() {
    // Fetch all batch timetables from the database
    const batchTimetables = await this.batchTimetableModel.find().lean();

    if (!batchTimetables || batchTimetables.length === 0) {
      throw new NotFoundException('No batch timetables found');
    }

    // Format the timetables and course details for each batch
    const formattedBatchTimetables = batchTimetables.map((batchTimetable) => {
      const courseMap = new Map<string, any>();
      for (const course of batchTimetable.course_details) {
        courseMap.set(course._id.toString(), course);
      }

      const formattedTimetable = batchTimetable.timetable.map((row) => {
        const formattedRow: any = { time: row.time };
        for (const day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']) {
          formattedRow[day] = row[day] ? courseMap.get(row[day].toString()) : null;
        }
        return formattedRow;
      });

      return {
        batch: batchTimetable.batch,
        timetable: formattedTimetable,
        course_details: batchTimetable.course_details,
      };
    });

    return formattedBatchTimetables;
  }
  async processAndSortTimetableFromCSV(filePath: string): Promise<{ [batch: string]: { timetable: any[]; course_details: any[]; teacher_course_details: any[] } }> {
    const batchTimetableMap = new Map<string, { timetable: any[]; course_details: any[]; teacher_course_details: any[] }>();
    let currentBatch: string | null = null;

    const courseDetailsMapForStudents = new Map<string, any>(); // For students
    const courseDetailsMapForTeachers = new Map<string, any>(); // For teachers

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          const trimmedRow = Object.keys(row).reduce((acc, key) => {
            acc[key.trim()] = row[key]?.trim(); // Trim keys and values
            return acc;
          }, {} as any);

          // Extract course details
          const { courseCode, courseName, instructor, room, credit, faculty, note, batch } = trimmedRow;

          // Update currentBatch only if a new batch value is provided in the row
          if (batch) {
            currentBatch = batch;
          }

          if (courseCode) {
            const normalizedCourseCode = courseCode.trim();

            // Store student course details (keyed by courseCode)
            if (!courseDetailsMapForStudents.has(normalizedCourseCode)) {
              courseDetailsMapForStudents.set(normalizedCourseCode, {
                _id: new Types.ObjectId(),
                courseCode,
                courseName,
                instructor,
                room,
                credit: parseInt(credit, 10),
                faculty,
                note,
              });
            }

            // Store teacher course details (keyed by courseCode + batch)
            if (currentBatch) {
              const uniqueKey = `${normalizedCourseCode}-${currentBatch.trim()}`;
              if (!courseDetailsMapForTeachers.has(uniqueKey)) {
                courseDetailsMapForTeachers.set(uniqueKey, {
                  _id: new Types.ObjectId(),
                  courseCode,
                  courseName,
                  instructor,
                  room,
                  credit: parseInt(credit, 10),
                  faculty,
                  note,
                  batch: currentBatch, // Include batch
                });
              }
            }
          }
        })
        .on('end', () => {
          // Second pass: Process timetable data
          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
              const trimmedRow = Object.keys(row).reduce((acc, key) => {
                acc[key.trim()] = row[key]?.trim();
                return acc;
              }, {} as any);

              // Update currentBatch only if a new batch value is provided in the row
              if (trimmedRow.batch) {
                currentBatch = trimmedRow.batch;
              }

              if (!currentBatch) {
                throw new Error('Batch not specified in the CSV file');
              }

              if (!batchTimetableMap.has(currentBatch)) {
                batchTimetableMap.set(currentBatch, { timetable: [], course_details: [], teacher_course_details: [] });
              }

              const batchData = batchTimetableMap.get(currentBatch);
              const { time } = trimmedRow;
              const timetableEntry: any = { time };
              const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

              days.forEach((day) => {
                const courseCode = trimmedRow[day]?.trim();
                if (courseCode) {
                  timetableEntry[day] = courseDetailsMapForStudents.get(courseCode) || null;
                } else {
                  timetableEntry[day] = null;
                }
              });

              batchData.timetable.push(timetableEntry);
            })
            .on('end', () => {
              // Assign student and teacher course details separately
              for (const [batch, data] of batchTimetableMap.entries()) {
                data.course_details = Array.from(courseDetailsMapForStudents.values()); // Students
                data.teacher_course_details = Array.from(courseDetailsMapForTeachers.values()).filter(c => c.batch === batch); // Teachers (filtered by batch)
              }

              // Sort the timetable by time
              for (const data of batchTimetableMap.values()) {
                data.timetable.sort((a, b) => {
                  const timeA = a.time ? a.time.split(':').map(Number) : [0, 0];
                  const timeB = b.time ? b.time.split(':').map(Number) : [0, 0];
                  return timeA[0] - timeB[0] || timeA[1] - timeB[1];
                });
              }

              resolve(Object.fromEntries(batchTimetableMap));
            })
            .on('error', reject);
        })
        .on('error', reject);
    });
  }
}
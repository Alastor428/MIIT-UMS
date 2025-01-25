import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { BatchTimetableService } from './batch.service';

@Controller('batch-timetable')
export class BatchTimetableController {
  constructor(private readonly batchTimetableService: BatchTimetableService) { }

  @Put(':batch')
  async updateBatchTimetableFromStudent(
    @Param('batch') batch: string,
    @Body() studentTimetableResponse: { timetable: any[]; course_details: any[] },
  ) {
    const { timetable, course_details } = studentTimetableResponse;

    // Call the upsertBatchTimetable method
    return this.batchTimetableService.upsertBatchTimetable(
      batch,
      'createdByUserId', // Replace with the actual createdBy user ID
      timetable,
      course_details,
    );
  }

  @Get(':batch')
  async getBatchTimetable(@Param('batch') batch: string) {
    return this.batchTimetableService.getBatchTimetable(batch);
  }
}
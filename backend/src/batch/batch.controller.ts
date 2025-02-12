import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BatchTimetableService } from './batch.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer"
import { extname } from 'path';

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

  // Route to upload CSV and update batch timetable
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('batch') batchName: string,  // Extract batch from query
    @Query('createdBy') createdByUserId: string,  // Extract createdBy from query
  ) {
    if (!batchName || !createdByUserId) {
      throw new BadRequestException('Both batch and createdBy query parameters are required.');
    }

    const filePath = file.path;
    const { timetable, course_details } = await this.batchTimetableService.processAndSortTimetableFromCSV(filePath);

    // Call the upsertBatchTimetable method to save the processed data
    return this.batchTimetableService.upsertBatchTimetable(
      batchName,
      createdByUserId,
      timetable,
      course_details,
    );
  }
}
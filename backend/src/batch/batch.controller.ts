import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BatchTimetableService } from './batch.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from 'src/guards/auth.guard';

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
      course_details, // Course details for students
      [], // Empty array for teacher course details (not used for students)
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
    @Query('createdBy') createdByUserId: string, // Extract createdBy from query
  ) {
    if (!createdByUserId) {
      throw new BadRequestException('The createdBy query parameter is required.');
    }

    const filePath = file.path;
    const batchTimetableData = await this.batchTimetableService.processAndSortTimetableFromCSV(filePath);

    // Upsert timetable for each batch
    const results = [];
    for (const [batch, data] of Object.entries(batchTimetableData)) {
      const result = await this.batchTimetableService.upsertBatchTimetable(
        batch,
        createdByUserId,
        data.timetable,
        data.course_details, // Student course details
        data.teacher_course_details, // Teacher course details (now separated)
      );
      results.push(result);
    }

    return {
      message: 'Batch timetables updated successfully',
      results,
    };
  }

}
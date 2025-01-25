import { Module } from '@nestjs/common';
import { BatchTimetableController } from './batch.controller';
import { BatchTimetableService } from './batch.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { BatchTimeTable, BatchTimeTableSchema } from './schemas/batchTimeTable.schema';
import { CourseDetailsModule } from 'src/course-details/course-details.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: BatchTimeTable.name, schema: BatchTimeTableSchema
        },
      ]),
    CourseDetailsModule
  ],
  controllers: [BatchTimetableController],
  providers: [BatchTimetableService],
  exports: [BatchTimetableService]
})
export class BatchModule { }

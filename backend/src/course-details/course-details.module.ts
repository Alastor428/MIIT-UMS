import { Module } from '@nestjs/common';
import { CourseDetailsService } from './course-details.service';
import { CourseDetailsController } from './course-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseDetails, CourseDetailsSchema } from './schemas/course-details.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseDetails.name, schema: CourseDetailsSchema }
    ])
  ],
  controllers: [CourseDetailsController],
  providers: [CourseDetailsService],
  exports: [CourseDetailsService, MongooseModule]
})
export class CourseDetailsModule { }

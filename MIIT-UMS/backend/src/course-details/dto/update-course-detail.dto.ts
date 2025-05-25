import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDetailDto } from './create-course-detail.dto';

export class UpdateCourseDetailDto extends PartialType(CreateCourseDetailDto) {}

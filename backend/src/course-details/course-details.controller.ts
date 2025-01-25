import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CourseDetailsService } from './course-details.service';
import { CourseDetails } from './schemas/course-details.schema';

@Controller('courses')
export class CourseDetailsController {
  constructor(private readonly courseService: CourseDetailsService) { }

  // @Post()
  // async createCourse(@Body() courseData: Partial<CourseDetails>) {
  //   const course = await this.courseService.createCourse(courseData);
  //   return {
  //     message: 'Course created successfully',
  //     course,
  //   };
  // }

  // @Put(':courseCode')
  // async updateCourse(
  //   @Param('courseCode') courseCode: string,
  //   @Body() updates: Partial<CourseDetails>,
  // ) {
  //   const updatedCourse = await this.courseService.editCourseDetails(courseCode, updates);
  //   return {
  //     message: 'Course updated successfully',
  //     updatedCourse,
  //   };
  // }

  // @Get(':courseCode')
  // async getCourse(@Param('courseCode') courseCode: string) {
  //   const course = await this.courseService.getCourse(courseCode);
  //   return {
  //     message: 'Course retrieved successfully',
  //     course,
  //   };
  // }

  // @Delete(':courseCode')
  // async deleteCourse(@Param('courseCode') courseCode: string) {
  //   await this.courseService.deleteCourse(courseCode);
  //   return {
  //     message: 'Course deleted successfully',
  //   };
  // }

  // @Get()
  // async getAllCourses() {
  //   const courses = await this.courseService.getAllCourses();
  //   return {
  //     message: 'All courses retrieved successfully',
  //     courses,
  //   };
  // }
}

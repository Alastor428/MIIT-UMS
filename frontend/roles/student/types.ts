export interface Task {
  id: number;
  title: string;
  details: string;
  color: string;
  dueDate: string;
}


export type CourseDetail = {
  courseCode: string;
  courseName?: string;
  credit?: number;
  faculty?: string;
  instructor?: string;
  note?: string;
  room?: string;
};

export interface Course {
  name: string;
  time: string;
  day: string;
  room: string;
  code: string;
  instructor: string;
  credit: string;
  faculty: string;
}

export interface FetchedCourse {
  _id: string;
  courseCode: string;
  courseName: string;
  credit: number;
  faculty: string;
  instructor: string;
  note: string;
  room: string;
}

export interface FetchedTimeSlot {
  time: string;
  Monday?: FetchedCourse;
  Tuesday?: FetchedCourse;
  Wednesday?: FetchedCourse;
  Thursday?: FetchedCourse;
  Friday?: FetchedCourse;
}
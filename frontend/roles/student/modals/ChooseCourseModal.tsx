import React, { useEffect } from "react";
import {
  Modal,
  Button,
  VStack,
  Text,
  ScrollView,
  Pressable,
} from "native-base";
import { add_course_student_timetable } from "@/api/student/add-course-student-timetable.api";
type CourseDetail = {
  courseCode: string;
  courseName?: string;
  credit?: number;
  faculty?: string;
  instructor?: string;
  note?: string;
  room?: string;
};

interface DateAndTime {
  day: string | undefined;
  time: string | undefined;
}

interface ChooseCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: CourseDetail[];
  date_time: DateAndTime;
  studendId: string;
  onCourseAdded: () => void;
}

const ChooseCourseModal: React.FC<ChooseCourseModalProps> = ({
  isOpen,
  onClose,
  courses,
  date_time,
  studendId,
  onCourseAdded,
}) => {
  const onSelectCourse = async (
    course: CourseDetail,
    date_time: DateAndTime,
    studentID: string
  ) => {
    console.log("pressed");
    const courseData = {
      day: date_time.day,
      time: date_time.time,
      courseCode: course.courseCode,
      courseName: course.courseName,
      instructor: course.instructor,
      room: course.room,
      credit: course.credit,
      faculty: course.faculty,
      note: course.note,
    };

    try {
      if (typeof add_course_student_timetable !== "function") {
        throw new Error("add_course_student_timetable is not a function");
      }

      const response = await add_course_student_timetable(
        courseData,
        studentID
      );
      onCourseAdded(); // Refresh timetable in parent component
      onClose();
    } catch (error) {
      console.error("Error adding course to timetable:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Choose a Course</Modal.Header>
        <Modal.Body>
          <ScrollView>
            <VStack space={3}>
              {courses.map((course, index) => (
                <Pressable
                  key={index}
                  bg="gray.100"
                  p={3}
                  rounded="md"
                  onPress={() => onSelectCourse(course, date_time, studendId)}
                >
                  <Text fontWeight="bold">{course.courseName}</Text>
                  <Text>Instructor: {course.instructor}</Text>
                  <Text>Room: {course.room}</Text>
                </Pressable>
              ))}
            </VStack>
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ChooseCourseModal;

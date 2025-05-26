import React, { useState } from "react";
import { Modal, Button, VStack } from "native-base";
import { Course } from "./Teacher_Timetable";
import CourseDetailsModal from "./CourseDetailModal";
import { delete_cell_teacher_timetable } from "@/api/teacher/delete-cell-teacher-timetable.api";
import { update_course_teacher_timetable } from "@/api/teacher/update-course-teacher-timetable.api";
import EditCourseModal from "./EditCourseModal";

type DateAndTime = {
  day: string | undefined;
  time: string | undefined;
};

interface OptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onViewMore: () => void;
  date_time: DateAndTime;
  token: string;
  onCourseAdded: () => void;
}
const OptionsModal = ({
  isOpen,
  onClose,
  course,
  onViewMore,
  date_time,
  token,
  onCourseAdded,
}: OptionsModalProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    const response = await delete_cell_teacher_timetable(date_time, token);
    console.log("Cell Deleted: ", response);
    onCourseAdded();
    onClose();
  };

  const handleViewMore = () => {
    if (course) {
      console.log("Opening course details modal");
      setIsDetailsModalOpen(true);
      onViewMore();
    }
  };

  const handleEdit = async () => {
    if (course) {
      console.log("Opening edit course modal");
      setIsEditModalOpen(true);
    } else {
      console.log("No course to edit");
    }
  };

  const handleEditCourse = async (updatedCourse: Course) => {
    const courseData = {
      oldCourseCode: course?.code,
      newCourseData: {
        day: date_time.day,
        time: date_time.time,
        courseCode: updatedCourse.code,
        courseName: updatedCourse.name,
        room: updatedCourse.room,
        credit: updatedCourse.credit,
        batch: updatedCourse.batch,
        note: "",
      },
    };
    const response = await update_course_teacher_timetable(courseData, token);
    onCourseAdded();
    setIsEditModalOpen(false);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Options</Modal.Header>
          <Modal.Body>
            <VStack space={2}>
              <Button onPress={handleViewMore} isDisabled={!course}>
                View More
              </Button>
              <Button onPress={handleEdit} isDisabled={!course}>
                Edit
              </Button>
              <Button onPress={handleDelete} colorScheme="danger">
                Delete
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <CourseDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        course={course}
      />
      {course && (
        <EditCourseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          course={course}
          handleEditCourse={handleEditCourse}
        />
      )}
    </>
  );
};

export default OptionsModal;

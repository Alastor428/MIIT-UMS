import React from "react";
import { Modal, Text, VStack } from "native-base";
import { Course } from "./Teacher_Timetable";

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

const CourseDetailsModal = ({
  isOpen,
  onClose,
  course,
}: CourseDetailsModalProps) => {
  if (!course) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Course Details</Modal.Header>
        <Modal.Body>
          <VStack space={2}>
            <Text>Name: {course.name}</Text>
            <Text>Time: {course.time}</Text>
            <Text>Room: {course.room}</Text>
            <Text>Instructor: {course.instructor}</Text>
            <Text>Code: {course.code}</Text>
            <Text>Credit: {course.credit}</Text>
            <Text>Faculty: {course.faculty}</Text>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              Note: Don't forget the Assignments!
            </Text>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default CourseDetailsModal;

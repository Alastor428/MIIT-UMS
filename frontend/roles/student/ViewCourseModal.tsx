import React from "react";
import { Modal, Box, Text, Button } from "native-base";


interface ViewCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    name: string;
    time: string;
    day: string;
    room: string;
    code: string;
    instructor: string;
    credit: string;
    faculty: string;
  };
}

const ViewCourseModal = ({ isOpen, onClose, course }: ViewCourseModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{course.name}</Modal.Header>
        <Modal.Body>
          <Text>
            <Text bold>Code: </Text>
            {course.code}
          </Text>
          <Text>
            <Text bold>Instructor: </Text>
            {course.instructor}
          </Text>
          <Text>
            <Text bold>Room: </Text>
            {course.room}
          </Text>
          <Text>
            <Text bold>Credit: </Text>
            {course.credit}
          </Text>
          <Text>
            <Text bold>Faculty: </Text>
            {course.faculty}
          </Text>

          {/* Adding the note for assignments */}
          <Text mt={4} color="red.500">
            <Text bold>Note:</Text> Don't Forget the Assignments!
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={onClose}>Close</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ViewCourseModal;

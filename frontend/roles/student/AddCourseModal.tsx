import React from "react";
import { Modal, Box, FormControl, Input, Button, Text } from "native-base";

// AddCourseModalProps interface to accept the new course properties
interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  newCourse: {
    name: string;
    time: string;
    day: string;
    room: string;
    code: string;
    instructor: string;
    credit: string;
    faculty: string;
  } | null;
  setNewCourse: React.Dispatch<React.SetStateAction<any>>;
  handleCourseSubmit: () => void;
}

const AddCourseModal = ({
  isOpen,
  onClose,
  newCourse,
  setNewCourse,
  handleCourseSubmit,
}: AddCourseModalProps) => {
  if (!newCourse) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add Course</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              value={newCourse.name}
              onChangeText={(text) => setNewCourse({ ...newCourse, name: text })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Code</FormControl.Label>
            <Input
              value={newCourse.code}
              onChangeText={(text) => setNewCourse({ ...newCourse, code: text })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Instructor</FormControl.Label>
            <Input
              value={newCourse.instructor}
              onChangeText={(text) => setNewCourse({ ...newCourse, instructor: text })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Room</FormControl.Label>
            <Input
              value={newCourse.room}
              onChangeText={(text) => setNewCourse({ ...newCourse, room: text })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Credit</FormControl.Label>
            <Input
              value={newCourse.credit}
              onChangeText={(text) => setNewCourse({ ...newCourse, credit: text })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Faculty</FormControl.Label>
            <Input
              value={newCourse.faculty}
              onChangeText={(text) => setNewCourse({ ...newCourse, faculty: text })}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={handleCourseSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddCourseModal;

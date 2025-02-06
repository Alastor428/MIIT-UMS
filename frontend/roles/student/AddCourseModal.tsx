import React from "react";
import { Modal, Button, Input, FormControl, Text } from "native-base";
import { Course } from "./Student_Timetable"; 

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  newCourse: Course;
  setNewCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  handleCourseSubmit: () => void;
}

const AddCourseModal = ({
  isOpen,
  onClose,
  newCourse,
  setNewCourse,
  handleCourseSubmit,
}: AddCourseModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add New Course</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Course Name</FormControl.Label>
            <Input
              value={newCourse?.name}
              onChangeText={(text) => setNewCourse({ ...newCourse!, name: text })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Instructor</FormControl.Label>
            <Input
              value={newCourse?.instructor}
              onChangeText={(text) => setNewCourse({ ...newCourse!, instructor: text })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Time</FormControl.Label>
            <Input
              value={newCourse?.time}
              onChangeText={(text) => setNewCourse({ ...newCourse!, time: text })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Room</FormControl.Label>
            <Input
              value={newCourse?.room}
              onChangeText={(text) => setNewCourse({ ...newCourse!, room: text })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Course Code</FormControl.Label>
            <Input
              value={newCourse?.code}
              onChangeText={(text) => setNewCourse({ ...newCourse!, code: text })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Credit</FormControl.Label>
            <Input
              value={newCourse?.credit}
              onChangeText={(text) => setNewCourse({ ...newCourse!, credit: text })}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Faculty</FormControl.Label>
            <Input
              value={newCourse?.faculty}
              onChangeText={(text) => setNewCourse({ ...newCourse!, faculty: text })}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blue" onPress={onClose}>
              Cancel
            </Button>
            <Button onPress={handleCourseSubmit}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddCourseModal;

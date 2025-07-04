import React, { useEffect, useState } from "react";
import { Modal, Button, Input, FormControl } from "native-base";
import { Course } from "./types";

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  handleEditCourse: (updatedCourse: Course) => void;
}

const EditCourseModal = ({
  isOpen,
  onClose,
  course,
  handleEditCourse,
}: EditCourseModalProps) => {
  const [updatedCourse, setUpdatedCourse] = useState<Course>(course);

  useEffect(() => {
    if (course) {
      setUpdatedCourse(course);
    }
  }, [course]);

  const handleSave = () => {
    handleEditCourse(updatedCourse);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Edit Course</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Course Name</FormControl.Label>
            <Input
              value={updatedCourse.name}
              onChangeText={(text) =>
                setUpdatedCourse((prev) => ({ ...prev, name: text }))
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Instructor</FormControl.Label>
            <Input
              value={updatedCourse.batch}
              onChangeText={(text) =>
                setUpdatedCourse((prev) => ({ ...prev, batch: text }))
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Time</FormControl.Label>
            <Input
              value={updatedCourse.time}
              onChangeText={(text) =>
                setUpdatedCourse((prev) => ({ ...prev, time: text }))
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Room</FormControl.Label>
            <Input
              value={updatedCourse.room}
              onChangeText={(text) =>
                setUpdatedCourse((prev) => ({ ...prev, room: text }))
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Course Code</FormControl.Label>
            <Input
              value={updatedCourse.code}
              onChangeText={(text) =>
                setUpdatedCourse((prev) => ({ ...prev, code: text }))
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Credit</FormControl.Label>
            <Input
              value={updatedCourse.credit}
              onChangeText={(text) =>
                setUpdatedCourse((prev) => ({ ...prev, credit: text }))
              }
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blue" onPress={onClose}>
              Cancel
            </Button>
            <Button onPress={handleSave}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default EditCourseModal;

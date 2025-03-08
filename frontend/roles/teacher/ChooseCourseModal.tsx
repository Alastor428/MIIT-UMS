import React from "react";
import {
  Modal,
  Button,
  VStack,
  Text,
  ScrollView,
  Pressable,
} from "native-base";

interface Course {
  name: string;
  time: string;
  day: string;
  room: string;
  code: string;
  instructor: string;
  credit: string;
  faculty: string;
}

interface ChooseCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

const ChooseCourseModal: React.FC<ChooseCourseModalProps> = ({
  isOpen,
  onClose,
  courses,
  onSelectCourse,
}) => {
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
                  onPress={() => onSelectCourse(course)}
                >
                  <Text fontWeight="bold">{course.name}</Text>
                  <Text>Instructor: {course.instructor}</Text>
                  <Text>
                    Time: {course.time} | Room: {course.room}
                  </Text>
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

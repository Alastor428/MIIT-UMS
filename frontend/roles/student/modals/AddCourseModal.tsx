import React, { useState } from "react";
import { Modal, Button, Input, FormControl } from "native-base";
import { add_course_student_timetable } from "@/api/student/add-course-student-timetable.api";

interface DateAndTime {
  day: string | undefined;
  time: string | undefined;
}

type NewCourse = {
  courseCode: string;
  courseName?: string;
  credit?: number;
  faculty?: string;
  instructor?: string;
  note?: string;
  room?: string;
};

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  date_time: DateAndTime;
  onCourseAdded: () => void;
  studentId: string;
}

const AddCourseModal = ({
  isOpen,
  onClose,
  date_time,
  onCourseAdded,
  studentId,
}: AddCourseModalProps) => {
  const [newCourse, setNewCourse] = useState<NewCourse>({
    courseCode: "",
    courseName: "",
    credit: undefined,
    faculty: "",
    instructor: "",
    note: "",
    room: "",
  });
  const courseData = {
    day: date_time.day,
    time: date_time.time,
    courseCode: newCourse.courseCode,
    courseName: newCourse.courseName,
    instructor: newCourse.instructor,
    room: newCourse.room,
    credit: newCourse.credit,
    faculty: newCourse.faculty,
    note: newCourse.note,
  };

  const handleCourseSubmit = async () => {
    await add_course_student_timetable(courseData, studentId);
    console.log("New Course Added:", newCourse);
    onCourseAdded();
    console.log("pressed");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add New Course</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Course Name</FormControl.Label>
            <Input
              value={newCourse.courseName}
              onChangeText={(text) =>
                setNewCourse({ ...newCourse, courseName: text })
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Instructor</FormControl.Label>
            <Input
              value={newCourse.instructor}
              onChangeText={(text) =>
                setNewCourse({ ...newCourse, instructor: text })
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Time</FormControl.Label>
            <Input
              value={date_time.time}
              editable={false} // Prevent manual editing
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Room</FormControl.Label>
            <Input
              value={newCourse.room}
              onChangeText={(text) =>
                setNewCourse({ ...newCourse, room: text })
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Course Code</FormControl.Label>
            <Input
              value={newCourse.courseCode}
              onChangeText={(text) =>
                setNewCourse({ ...newCourse, courseCode: text })
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Credit</FormControl.Label>
            <Input
              value={newCourse.credit ? newCourse.credit.toString() : ""}
              keyboardType="numeric"
              onChangeText={(text) =>
                setNewCourse({
                  ...newCourse,
                  credit: text ? parseInt(text, 10) : undefined,
                })
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label>Faculty</FormControl.Label>
            <Input
              value={newCourse.faculty}
              onChangeText={(text) =>
                setNewCourse({ ...newCourse, faculty: text })
              }
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

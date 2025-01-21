import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Pressable,
  Modal,
  Input,
  FormControl,
} from "native-base";

interface Course {
  name: string;
  time: string;
  day: string;
  room: string;
}

const Student_Timetable = () => {
  const [selectedView, setSelectedView] = useState<"week" | "day">("week");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Default to Wednesday (index 2)
  const [newCourse, setNewCourse] = useState<Course | null>(null); // New course state

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [courses, setCourses] = useState<Course[]>([
    { name: "Math 3020", time: "9-9:50", day: "Monday", room: "201" },
    { name: "CSE 3050", time: "9-9:50", day: "Wednesday", room: "211" },
    { name: "CSE 3060", time: "10-10:50", day: "Wednesday", room: "211" },
    { name: "CSE 3030", time: "3-3:50", day: "Tuesday", room: "211" },
  ]);

  const handleCourseClick = (
    course: Course | null,
    timeSlot: string,
    day: string
  ) => {
    if (!course) {
      // Open the modal to add a new course if no course exists in that time slot
      setNewCourse({ name: "", time: timeSlot, day, room: "" });
      setSelectedCourse(null); // Set selectedCourse to null to show "Add Course" in the modal title
    } else {
      // Open the modal to view the course details if a course exists in the time slot
      setSelectedCourse(course);
      setNewCourse(null); // Ensure newCourse is cleared if editing an existing course
    }
    setIsModalOpen(true); // Open the modal
  };

  const handleCourseSubmit = () => {
    if (newCourse) {
      // Update the courses array with the new course
      setCourses((prevCourses) => [...prevCourses, newCourse]);
      setNewCourse(null);
      setIsModalOpen(false);
    }
  };

  const navigateDay = (direction: "prev" | "next") => {
    setSelectedDayIndex((prevIndex) =>
      direction === "prev"
        ? (prevIndex - 1 + days.length) % days.length
        : (prevIndex + 1) % days.length
    );
  };

  return (
    <Box flex={1} bg="white" p={4}>
      {/* View Selector */}
      <HStack justifyContent="center" space={4} mb={4}>
        <Button
          variant={selectedView === "week" ? "solid" : "outline"}
          onPress={() => setSelectedView("week")}
        >
          Week
        </Button>
        <Button
          variant={selectedView === "day" ? "solid" : "outline"}
          onPress={() => setSelectedView("day")}
        >
          Day
        </Button>
      </HStack>

      {/* Week View */}
      {selectedView === "week" ? (
        <VStack>
          {/* Header Row */}
          <HStack py={2}>
            <Text width="16%" fontWeight="bold" textAlign="center">
              Time
            </Text>
            {["  Mon", "  Tue", "  Wed", "    Thu", "        Fri"].map((day) => (
              <Text key={day} width="16%" fontWeight="bold" textAlign="center">
                {day}
              </Text>
            ))}
          </HStack>

          {/* Time Rows */}
          {[
            "9-9:50",
            "10-10:50",
            "11-11:50",
            "1-1:50",
            "2-2:50",
            "3-3:50",
            "4-4:50",
          ].map((timeSlot) => (
            <HStack key={timeSlot} py={1} mb={1}>
              <Text width="16%" textAlign="center" fontSize="sm">
                {timeSlot}
              </Text>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day) => {
                  const course = courses.find(
                    (c) => c.day === day && c.time === timeSlot
                  );
                  return (
                    <Pressable
                      key={day}
                      onPress={() =>
                        handleCourseClick(course || null, timeSlot, day)
                      }
                      bg={course ? "primary.200" : "gray.100"}
                      p={1}
                      rounded="md"
                      height="60px"
                      width="16%"
                      justifyContent="center"
                      alignItems="center"
                      mx={0.5}
                    >
                      <Text fontSize="xs" textAlign="center">
                        {course ? course.name : "Add"}
                      </Text>
                    </Pressable>
                  );
                }
              )}
            </HStack>
          ))}
        </VStack>
      ) : (
        // Day View with Navigation
        <VStack space={4}>
          {/* Day Navigation */}
          <HStack justifyContent="center" alignItems="center" space={2} mb={4}>
            <Button size="sm" onPress={() => navigateDay("prev")} mx={1}>
              &lt;
            </Button>
            <Text fontWeight="bold" fontSize="lg">
              {days[selectedDayIndex]}
            </Text>
            <Button size="sm" onPress={() => navigateDay("next")} mx={1}>
              &gt;
            </Button>
          </HStack>
          {/* Courses for Selected Day */}
          {courses
            .filter((course) => course.day === days[selectedDayIndex])
            .map((course, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  handleCourseClick(course, course.time, course.day)
                }
                bg="primary.200"
                p={4}
                rounded="md"
              >
                <Text fontWeight="bold">{course.name}</Text>
                <Text>{course.time}</Text>
                <Text>Room: {course.room}</Text>
              </Pressable>
            ))}
        </VStack>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            {selectedCourse ? selectedCourse.name : "Add Course"}
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Course Name</FormControl.Label>
              <Input
                value={newCourse?.name || ""}
                onChangeText={(text) =>
                  setNewCourse((prev) =>
                    prev
                      ? { ...prev, name: text }
                      : { name: text, time: "", day: "", room: "" }
                  )
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormControl.Label>Room</FormControl.Label>
              <Input
                value={newCourse?.room || ""}
                onChangeText={(text) =>
                  setNewCourse((prev) =>
                    prev
                      ? { ...prev, room: text }
                      : { name: "", time: "", day: "", room: text }
                  )
                }
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <HStack space={4} w="100%" justifyContent="flex-end">
              <Button onPress={handleCourseSubmit}>Save</Button>
              <Button onPress={() => setIsModalOpen(false)}>Cancel</Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default Student_Timetable;

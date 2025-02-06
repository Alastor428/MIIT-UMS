import React, { useState } from "react";
import { Box, Text, Button, VStack, HStack, Pressable } from "native-base";
import AddCourseModal from "./AddCourseModal";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import OptionsModal from "./OpnionsModal";

export interface Course {
  name: string;
  time: string;
  day: string;
  room: string;
  code: string;
  instructor: string;
  credit: string;
  faculty: string;
}

const Student_Timetable = () => {
  const [selectedView, setSelectedView] = useState<"week" | "day">("week");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(2);
  const [newCourse, setNewCourse] = useState<Course | null>(null);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [courses, setCourses] = useState<Course[]>([
    {
      name: "Math 3020",
      time: "9-9:50",
      day: "Monday",
      room: "201",
      code: "Math 3020",
      instructor: "Dr. Smith",
      credit: "3",
      faculty: "Science",
    },
    {
      name: "CSE 3050",
      time: "9-9:50",
      day: "Wednesday",
      room: "211",
      code: "CSE 3050",
      instructor: "Prof. Jack",
      credit: "4",
      faculty: "Engineering",
    },
    {
      name: "CSE 3060",
      time: "10-10:50",
      day: "Wednesday",
      room: "211",
      code: "CSE 3060",
      instructor: "Prof. Hally",
      credit: "4",
      faculty: "Engineering",
    },
    {
      name: "CSE 3030",
      time: "3-3:50",
      day: "Tuesday",
      room: "211",
      code: "CSE 3030",
      instructor: "Dr. Johnson",
      credit: "3",
      faculty: "Engineering",
    },
  ]);

  const handleCourseClick = (
    course: Course | null,
    timeSlot: string,
    day: string
  ) => {
    if (!course) {
      setNewCourse({
        name: "",
        time: timeSlot,
        day,
        room: "",
        code: "",
        instructor: "",
        credit: "",
        faculty: "",
      });
      setSelectedCourse(null);
    } else {
      setSelectedCourse(course);
      setNewCourse(null);
    }
    setIsModalOpen(true);
  };

  const handleCourseSubmit = () => {
    if (newCourse) {
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

  const handleViewMore = () => {
    console.log("View More clicked for", selectedCourse?.name);
  };

  const handleEdit = () => {
    console.log("Edit clicked for", selectedCourse?.name);
  };

  const handleDeleteCourse = (courseToDelete: Course) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.code !== courseToDelete.code)
    );
    setIsModalOpen(false);
    console.log(`Deleted course: ${courseToDelete.name}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Box flex={1} bg="white" p={4}>
          
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
          {selectedView === "week" ? (
            <VStack>
              <HStack py={2}>
                <Text width="18%" fontWeight="bold" textAlign="center">
                  Time
                </Text>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <Text
                    key={day}
                    width="16%"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {day}
                  </Text>
                ))}
              </HStack>
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
            <VStack space={4}>
              <HStack
                justifyContent="center"
                alignItems="center"
                space={2}
                mb={4}
              >
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

          {newCourse ? (
            <AddCourseModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              newCourse={newCourse}
              setNewCourse={setNewCourse}
              handleCourseSubmit={handleCourseSubmit}
            />
          ) : selectedCourse ? (
            <OptionsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              course={selectedCourse}
              onViewMore={handleViewMore}
              onEdit={handleEdit}
              onDelete={() => handleDeleteCourse(selectedCourse!)} 
            />
          ) : null}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Student_Timetable;

import React, { useState } from "react";
import { Box, Text, Button, VStack, HStack, Pressable } from "native-base";
import AddCourseModal from "./AddCourseModal";
import ViewCourseModal from "./ViewCourseModal";
import AskingModal from "./AskingModal";
import ChooseCourseModal from "./ChooseCourseModal";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

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

const Student_Dashboard = () => {
  const [isAskingModalOpen, setIsAskingModalOpen] = useState(false);
  const [isChooseCourseModalOpen, setIsChooseCourseModalOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<"morning" | "evening">(
    "morning"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Course | null>(null);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const morningTimeSlots = ["9:00-9:50", "10:00-10:50", "11:00-11:50"];
  const eveningTimeSlots = ["1:00-1:50", "2:00-2:50", "3:00-3:50", "4:00-4:50"];

  const [courses, setCourses] = useState<Course[]>([
    {
      name: "CSE 3030",
      time: "10:00-10:50",
      day: "Mon",
      room: "201",
      code: "CSE 3030",
      instructor: "Dr.Smith",
      credit: "3",
      faculty: "Mathematics",
    },
    {
      name: "MATH 3020",
      time: "11:00-11:50",
      day: "Mon",
      room: "201",
      code: "MATH 3020",
      instructor: "Prof. Jack",
      credit: "4",
      faculty: "Engineering",
    },
    {
      name: "CSE 3060",
      time: "1:00-1:50",
      day: "Mon",
      room: "201",
      code: "CSE 3060",
      instructor: "Prof. Jack",
      credit: "4",
      faculty: "Engineering",
    },
    {
      name: "HSS C013",
      time: "2:00-2:50",
      day: "Mon",
      room: "201",
      code: "HSS C013",
      instructor: "Prof. Jack",
      credit: "4",
      faculty: "Engineering",
    },
    {
      name: "CSE 3041",
      time: "3:00-3:50",
      day: "Mon",
      room: "201",
      code: "CSE 3041",
      instructor: "Prof. Jack",
      credit: "4",
      faculty: "Engineering",
    },
    {
      name: "CSE 3041",
      time: "4:00-4:50",
      day: "Mon",
      room: "201",
      code: "CSE 3041",
      instructor: "Prof. Jack",
      credit: "4",
      faculty: "Engineering",
    },
    {
      name: "CSE 3040",
      time: "9:00-9:50",
      day: "Tue",
      room: "201",
      code: "CSE 3040",
      instructor: "Prof. Jack",
      credit: "4",
      faculty: "Engineering",
    },
    {
      name: "CSE 3060",
      time: "10:00-10:50",
      day: "Tue",
      room: "201",
      code: "CSE 3060",
      instructor: "Prof. Jack",
      credit: "4",
      faculty: "Engineering",
    },
    {
      name: "CSE 3050",
      time: "11:00-11:50",
      day: "Tue",
      room: "201",
      code: "CSE 3050",
      instructor: "Prof. Jack",
      credit: "4",
      faculty: "Engineering",
    },
    {
      name: "CSE 3020",
      time: "2:00-2:50",
      day: "Tue",
      room: "201",
      code: "CSE 3020",
      instructor: "Prof. Jack",
      credit: "4",
      faculty: "Engineering",
    },
    {
      name: "CSE 3030",
      time: "9:00-9:50",
      day: "Wed",
      room: "201",
      code: "CSE 3030",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "CSE 3040",
      time: "11:00-11:50",
      day: "Wed",
      room: "201",
      code: "CSE 3040",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "CSE 3030",
      time: "1:00-1:50",
      day: "Wed",
      room: "201",
      code: "CSE 3030",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "CSE 3050",
      time: "2:00-2:50",
      day: "Wed",
      room: "201",
      code: "CSE 3050",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "CSE 3030",
      time: "9:00-9:50",
      day: "Thur",
      room: "201",
      code: "CSE 3030",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "CSE 3020",
      time: "10:00-10:50",
      day: "Thur",
      room: "201",
      code: "CSE 3020",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "CSE 3050",
      time: "11:00-11:50",
      day: "Thur",
      room: "201",
      code: "CSE 3050",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "CSE 3040",
      time: "1:00-1:50",
      day: "Thur",
      room: "201",
      code: "CSE 3040",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "CSE 3060",
      time: "2:00-2:50",
      day: "Thur",
      room: "201",
      code: "CSE 3060",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "LANG 3020",
      time: "3:00-3:50",
      day: "Thur",
      room: "201",
      code: "LANG 3020",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "CSE 3030",
      time: "9:00-9:50",
      day: "Fri",
      room: "201",
      code: "CSE 3030",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "CSE 3050",
      time: "11:00-11:50",
      day: "Fri",
      room: "201",
      code: "CSE 3050",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "CSE 3060",
      time: "1:00-1:50",
      day: "Fri",
      room: "201",
      code: "CSE 3060",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
    },
    {
      name: "MATH 3020",
      time: "3:00-3:50",
      day: "Fri",
      room: "201",
      code: "MATH 3020",
      instructor: "Prof. Smith",
      credit: "4",
      faculty: "Science",
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
      setIsAskingModalOpen(true); // Open the AskingModal first
    } else {
      setSelectedCourse(course);
      setNewCourse(null);
      setIsModalOpen(true); // Open ViewCourseModal when an existing course is selected
    }
  };

  const handleCourseSubmit = () => {
    if (newCourse) {
      setCourses((prevCourses) => [...prevCourses, newCourse]);
      setNewCourse(null);
      setIsModalOpen(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <Box flex={1} bg="white" p={4}>
          {/* Announcement Section */}

          <Box
            bg="rgb(255, 219, 99)"
            borderRadius="20px"
            padding={5}
            shadow={3}
            // margin={5}
            width="100%"
            height={187}
            justifyContent="space-between"
          >
            <VStack space={2} flex={1}>
              {/* Title Section */}
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="black"
                textAlign="left"
                marginBottom={5}
              >
                Special Project TalkShow
              </Text>

              {/* Details Section with See More */}

              {/* Date Section */}
              <Text fontSize="lg" color="black" marginBottom={2}>
                25.2.2025 {/* Display the date here */}
              </Text>

              {/* Time and View Detail Section */}
              <HStack justifyContent="space-between" alignItems="center">
                {/* Time on the left */}
                <Text fontSize="lg" color="black" textAlign="left">
                  5:00 - 6:00 PM
                </Text>
                {/* View Detail button on the right */}
              </HStack>
            </VStack>
          </Box>
          <Text
            fontSize="lg"
            fontWeight="400"
            mb={5}
            height={37}
            //style={{ fontStyle: "italic" }}
          >
            Timetable
          </Text>
          <VStack height={375} flex={1} py={10} justifyContent="flex-end">
            <HStack flexWrap="nowrap">
              <Text
                width="15%"
                fontWeight="400"
                textAlign="center"
                fontSize="18px"
              ></Text>
              {selectedView === "morning"
                ? morningTimeSlots.map((time) => (
                    <Text
                      key={time}
                      width="30%"
                      fontSize="sm"
                      fontWeight="400"
                      textAlign="center"
                    >
                      {time}
                    </Text>
                  ))
                : eveningTimeSlots.map((time) => (
                    <Text
                      key={time}
                      width="21%"
                      fontSize="15px"
                      fontWeight="400"
                      textAlign="center"
                    >
                      {time}
                    </Text>
                  ))}
            </HStack>
            {days.map((day) => (
              <HStack key={day} py={1} flexWrap="nowrap">
                <Text
                  width="15%"
                  textAlign="center"
                  fontSize="18px"
                  fontWeight="400"
                  marginTop="12px"
                  //style={{ fontStyle: "italic" }}
                >
                  {day}
                </Text>
                {selectedView === "morning"
                  ? morningTimeSlots.map((timeSlot) => {
                      const course = courses.find(
                        (c) => c.day === day && c.time === timeSlot
                      );
                      return (
                        <Pressable
                          key={timeSlot}
                          onPress={() =>
                            handleCourseClick(course || null, timeSlot, day)
                          }
                          bg={course ? "primary.200" : "gray.100"}
                          //p={1}
                          rounded="md"
                          height="60px"
                          width="28%"
                          justifyContent="center"
                          alignItems="center"
                          mx={0.5}
                        >
                          <Text fontSize="xs" textAlign="center">
                            {course ? course.name : "Add"}
                          </Text>
                        </Pressable>
                      );
                    })
                  : eveningTimeSlots.map((timeSlot) => {
                      const course = courses.find(
                        (c) => c.day === day && c.time === timeSlot
                      );
                      return (
                        <Pressable
                          key={timeSlot}
                          onPress={() =>
                            handleCourseClick(course || null, timeSlot, day)
                          }
                          bg={course ? "primary.200" : "gray.100"}
                          p={1}
                          rounded="md"
                          height="60px"
                          width="20%"
                          justifyContent="center"
                          alignItems="center"
                          mx={0.5}
                        >
                          <Text fontSize="xs" textAlign="center">
                            {course ? course.name : "Add"}
                          </Text>
                        </Pressable>
                      );
                    })}
              </HStack>
            ))}
          </VStack>

          <HStack
            width="full"
            marginTop={-10}
            flex={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Button
              width="50%"
              variant={selectedView === "morning" ? "solid" : "outline"}
              onPress={() => setSelectedView("morning")}
              bg={selectedView === "morning" ? "yellow.300" : "transparent"}
              _text={{
                color: selectedView === "morning" ? "white" : "black",
              }}
            >
              Morning
            </Button>
            <Button
              width="50%"
              variant={selectedView === "evening" ? "solid" : "outline"}
              onPress={() => setSelectedView("evening")}
              bg={selectedView === "evening" ? "purple.300" : "transparent"}
              _text={{
                color: selectedView === "evening" ? "white" : "black",
              }}
            >
              Evening
            </Button>
          </HStack>

          {newCourse ? (
            <>
              <AskingModal
                isOpen={isAskingModalOpen}
                onClose={() => setIsAskingModalOpen(false)}
                onChooseCourse={() => {
                  setIsAskingModalOpen(false);
                  setIsChooseCourseModalOpen(true); // Opens ChooseCourseModal
                }}
                onCreateCourse={() => {
                  setIsAskingModalOpen(false);
                  setIsModalOpen(true); // Opens AddCourseModal
                }}
              />
              <ChooseCourseModal
                isOpen={isChooseCourseModalOpen}
                onClose={() => setIsChooseCourseModalOpen(false)}
                courses={[]} // Provide the courses array for ChooseCourseModal
                onSelectCourse={() => {}}
              />
              <AddCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                newCourse={newCourse}
                setNewCourse={setNewCourse}
                handleCourseSubmit={handleCourseSubmit}
              />
            </>
          ) : selectedCourse ? (
            <ViewCourseModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              course={selectedCourse}
            />
          ) : null}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Student_Dashboard;

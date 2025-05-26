import React, { useEffect, useState } from "react";
import { Box, Text, Button, VStack, HStack, Pressable } from "native-base";
import AddCourseModal from "./AddCourseModal";
import ViewCourseModal from "./ViewCourseModal";
import AskingModal from "./AskingModal";
import ChooseCourseModal from "./ChooseCourseModal";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { get_teacher_timetable } from "@/api/teacher/get-teacher-timetable.api";
import { CourseDetail, FetchedTimeSlot } from "./types";

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

type FetchedTimetable = FetchedTimeSlot[];

const dayMapping: { [key: string]: string } = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
};

interface TeacherDashboardProps {
  token: string;
  teacherId: string;
}

const Teacher_Dashboard: React.FC<TeacherDashboardProps> = ({
  token,
  teacherId,
}) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const morningTimeSlots = ["9:00-9:50", "10:00-10:50", "11:00-11:50"];
  const eveningTimeSlots = ["1:00-1:50", "2:00-2:50", "3:00-3:50", "4:00-4:50"];

  const transformedTimetableData = (timetable: FetchedTimetable): Course[] => {
    const courses: Course[] = [];

    timetable.forEach((timeSlot) => {
      const time = timeSlot.time;
      days.forEach((day) => {
        const abbreviatedDay = dayMapping[day];
        const courseData = timeSlot[abbreviatedDay as keyof FetchedTimeSlot];
        if (
          courseData &&
          typeof courseData === "object" &&
          !Array.isArray(courseData)
        ) {
          courses.push({
            name: courseData.courseName,
            time: time,
            day: day,
            room: courseData.room,
            code: courseData.courseCode,
            instructor: courseData.instructor,
            credit: courseData.credit.toString(),
            faculty: courseData.faculty,
          });
        }
      });
    });

    return courses;
  };

  const refreshTimetable = async () => {
    const data = await get_teacher_timetable(token);
    setCourseDetails(data.course_details);
    setCourses(transformedTimetableData(data.timetable));
  };

  const [isAskingModalOpen, setIsAskingModalOpen] = useState(false);
  const [isChooseCourseModalOpen, setIsChooseCourseModalOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<"morning" | "evening">(
    "morning"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Course | null>(null);

  const [courses, setCourses] = useState<Course[]>([]);
  console.log(courses);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_teacher_timetable(token);
      const transformedCourses = transformedTimetableData(data.timetable);
      setCourseDetails(data.course_details);
      setCourses(transformedCourses);
    };
    fetchData();
  }, [token]);

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

export default Teacher_Dashboard;

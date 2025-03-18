import React, { useEffect, useState } from "react";
import { Box, Text, Button, VStack, HStack, Pressable } from "native-base";
import AddCourseModal from "./modals/AddCourseModal";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import OptionsModal from "./OpnionsModal";
import { get_student_timetable } from "@/api/student/get-student-timetable.api";
import { Course, FetchedTimeSlot } from "./types";

type FetchedTimetable = FetchedTimeSlot[];

const dayMapping: { [key: string]: string } = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
};

interface Student_Timetable_Props {
  token: string;
  studentId: string;
}

const Student_Timetable: React.FC<Student_Timetable_Props> = ({
  token,
  studentId,
}) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

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
    const data = await get_student_timetable(token);
    setCourses(transformedTimetableData(data.timetable));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_student_timetable(token);
      const transformedCourses = transformedTimetableData(data.timetable);
      setCourses(transformedCourses);
    };
    fetchData();
  }, [token]);

  const [selectedView, setSelectedView] = useState<"week" | "day">("week");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(2);
  const [newCourse, setNewCourse] = useState<Course | null>(null);

  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedDay, setSelectedDay] = useState<string>();

  const date_time = {
    day: selectedDay,
    time: selectedTime,
  };

  const [courses, setCourses] = useState<Course[]>([]);

  const handleCourseClick = (
    course: Course | null,
    timeSlot: string,
    day: string
  ) => {
    setSelectedTime(timeSlot);
    setSelectedDay(dayMapping[day]);
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
                "9:00-9:50",
                "10:00-10:50",
                "11:00-11:50",
                "1:00-1:50",
                "2:00-2:50",
                "3:00-3:50",
                "4:00-4:50",
              ].map((timeSlot) => (
                <HStack key={timeSlot} py={1} mb={1}>
                  <Text width="16%" textAlign="center" fontSize="sm">
                    {timeSlot}
                  </Text>
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => {
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
                  })}
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
              date_time={date_time}
              onCourseAdded={refreshTimetable}
              studentId={studentId}
            />
          ) : selectedCourse ? (
            <OptionsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              course={selectedCourse}
              onViewMore={handleViewMore}
              date_time={date_time}
              token={token}
              onCourseAdded={refreshTimetable}
            />
          ) : null}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Student_Timetable;

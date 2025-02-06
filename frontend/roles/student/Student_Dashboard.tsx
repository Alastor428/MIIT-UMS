import React, { useState } from "react";
import { Box, Text, Button, VStack, HStack, Pressable } from "native-base";
import AddCourseModal from "./AddCourseModal";
import ViewCourseModal from "./ViewCourseModal";
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
  const [selectedView, setSelectedView] = useState<"morning" | "evening">("morning");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Course | null>(null);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  
  const morningTimeSlots = ["9:00-9:50", "10:00-10:50", "11:00-11:50"];
  const eveningTimeSlots = ["1:00-1:50", "2:00-2:50", "3:00-3:50", "4:00-4:50"];

  const [courses, setCourses] = useState<Course[]>([
    { name: "Math 3020", time: "9:00-9:50", day: "Mon", room: "201", code: "Math 3020", instructor: "Dr. Smith", credit: "3", faculty: "Science" },
    { name: "CSE 3050", time: "2:00-2:50", day: "Wed", room: "211", code: "CSE 3050", instructor: "Prof. Jack", credit: "4", faculty: "Engineering" },
  ]);

  const handleCourseClick = (course: Course | null, timeSlot: string, day: string) => {
    if (!course) {
      setNewCourse({ name: "", time: timeSlot, day, room: "", code: "", instructor: "", credit: "", faculty: "" });
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

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}>
        <Box flex={1} bg="white" p={4}>

          {/* Announcement Section */}
          <Box mb={4}>
            <Text fontSize="xl" fontWeight="bold">Announcement Here</Text>
          </Box>

         
          <Box mb={4}>
            <Text fontSize="24px" fontWeight="400" mb={2} style={{ fontStyle: 'italic' }}>Timetable</Text>
            <VStack flex={1} justifyContent="flex-end">
              <HStack py={2} flexWrap="nowrap">
                <Text width="15%" fontWeight="400" textAlign="center" fontSize="18px">Day</Text>
                {selectedView === "morning" 
                  ? morningTimeSlots.map((time) => (
                      <Text key={time} width="28%" fontSize="18px" fontWeight="400" textAlign="center">{time}</Text>
                    ))
                  : eveningTimeSlots.map((time) => (
                      <Text key={time} width="21%" fontSize="16px" fontWeight="400" textAlign="center">{time}</Text>
                    ))
                }
              </HStack>           
              {days.map((day) => (
                <HStack key={day} py={2} flexWrap="nowrap">
                  <Text
                    width="15%"
                    textAlign="center"
                    fontSize="18px"
                    fontWeight="400"
                    style={{ fontStyle: "italic"}} 
                  >
                    {day}
                  </Text>
                  {selectedView === "morning"
                    ? morningTimeSlots.map((timeSlot) => {
                        const course = courses.find((c) => c.day === day && c.time === timeSlot);
                        return (
                          <Pressable
                            key={timeSlot}
                            onPress={() => handleCourseClick(course || null, timeSlot, day)}
                            bg={course ? "primary.200" : "gray.100"}
                            p={1}
                            rounded="md"
                            height="60px"
                            width="28%" 
                            justifyContent="center"
                            alignItems="center"
                            mx={0.5}
                          >
                            <Text fontSize="xs" textAlign="center">{course ? course.name : "Add"}</Text>
                          </Pressable>
                        );
                      })
                    : eveningTimeSlots.map((timeSlot) => {
                        const course = courses.find((c) => c.day === day && c.time === timeSlot);
                        return (
                          <Pressable
                            key={timeSlot}
                            onPress={() => handleCourseClick(course || null, timeSlot, day)}
                            bg={course ? "primary.200" : "gray.100"}
                            p={1}
                            rounded="md"
                            height="60px"
                            width="20%" 
                            justifyContent="center"
                            alignItems="center"
                            mx={0.5}
                          >
                            <Text fontSize="xs" textAlign="center">{course ? course.name : "Add"}</Text>
                          </Pressable>
                        );
                      })
                  }
                </HStack>
              ))}
            </VStack>                
         
            <HStack width="full" mb={4}>
              <Button
                width="50%"
                variant={selectedView === "morning" ? "solid" : "outline"}
                onPress={() => setSelectedView("morning")}
                bg={selectedView === "morning" ? "yellow.300" : "transparent"} 
                _text={{ color: selectedView === "morning" ? "white" : "black" }} 
              >
                Morning
              </Button>
              <Button
                width="50%"
                variant={selectedView === "evening" ? "solid" : "outline"}
                onPress={() => setSelectedView("evening")}
                bg={selectedView === "evening" ? "purple.300" : "transparent"} 
                _text={{ color: selectedView === "evening" ? "white" : "black" }}
              >
                Evening
              </Button>
            </HStack>

            {newCourse ? (
              <AddCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                newCourse={newCourse}
                setNewCourse={setNewCourse}
                handleCourseSubmit={handleCourseSubmit}
              />
            ) : selectedCourse ? (
              <ViewCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                course={selectedCourse}
              />
            ) : null}
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Student_Dashboard;

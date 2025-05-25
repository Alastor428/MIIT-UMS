import React, { useEffect } from "react"; // ✅ ADD THIS LINE
import * as DocumentPicker from "expo-document-picker";
import { StyleSheet, Alert } from "react-native";
import {
  View,
  Text,
  Button,
  Select,
  VStack,
  HStack,
  Pressable,
  ScrollView,
  Center,
  Column,
} from "native-base";
import { useState } from "react";
import uploadTimetable from "@/api/batch-timetable/upload-timetable.api";
import { Course, CourseDetail, FetchedTimeSlot } from "../student/types";
import { get_batch_timetable } from "@/api/batch-timetable/get-timetable.api";

type FetchedTimetable = FetchedTimeSlot[];

const dayMapping: { [key: string]: string } = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
};

export default function TimeTableManagement() {
  const [selectedView, setSelectedView] = useState<"morning" | "evening">(
    "morning"
  );
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const morningTimeSlots = ["9:00-9:50", "10:00-10:50", "11:00-11:50"];
  const eveningTimeSlots = ["1:00-1:50", "2:00-2:50", "3:00-3:50", "4:00-4:50"];
  const [batch, setBatch] = useState("2021-S1");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await get_batch_timetable(batch);
      const transformedCourses = transformedTimetableData(data.timetable);
      setCourseDetails(data.course_details);
      setCourses(transformedCourses);
    };
    fetchData();
  }, [batch]);

  // Check if file has .csv extension
  const isCSVFile = (fileName: string) => {
    return fileName.toLowerCase().endsWith(".csv");
  };

  const pickCSV = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: [
          "text/csv",
          "application/csv",
          "text/comma-separated-values",
          "application/vnd.ms-excel",
          "*/*",
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!res.canceled && res.assets?.length) {
        const file = res.assets[0];

        if (!isCSVFile(file.name)) {
          Alert.alert(
            "Invalid File",
            "Please select a file with .csv extension."
          );
          return;
        }

        setFileName(file.name);
        setFileUri(file.uri);
        setMimeType(file.mimeType || "text/csv");

        console.log("CSV file URI:", file.uri);
      } else {
        console.log("User cancelled file selection");
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleUpload = async () => {
    if (!fileUri || !fileName) {
      Alert.alert("No File", "Please select a CSV file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        name: fileName,
        type: mimeType || "text/csv",
      } as any);

      const response = await uploadTimetable(formData, "admin");
      console.log("Upload response:", response);
      Alert.alert("Success", "Timetable uploaded successfully.");
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload Failed", "An error occurred during upload.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        gap: 2,
      }}
      // contentContainerClassName="flex-grow-1 justify-between"
    >
      {/* Header */}
      <View width={100} backgroundColor="gray.300">
        <Select
          selectedValue={batch}
          minWidth="150px"
          placeholder="Program"
          onValueChange={(value) => setBatch(value)}
        >
          <Select.Item label="2021-S1" value="2021-S1" />
          <Select.Item label="2021-S2" value="2021-S2" />
        </Select>
      </View>
      {/* TimeTable */}
      <Text style={{ fontStyle: "italic" }} fontSize={20} fontWeight={500}>
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
                      // onPress={() =>
                      //   handleCourseClick(course || null, timeSlot, day)
                      // }
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
                        {course ? course.name : ""}
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
                      // onPress={() =>
                      //   handleCourseClick(course || null, timeSlot, day)
                      // }
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
                        {course ? course.name : ""}
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

      {/* Upload */}
      <View display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Text style={styles.title}>Upload CSV Timetable</Text>
        <Button onPress={pickCSV}>Pick CSV File</Button>
        {fileName && <Text style={styles.filename}>Selected: {fileName}</Text>}
        <Button mt={4} onPress={handleUpload}>
          Upload
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 16, marginBottom: 20 },
  filename: { marginTop: 10, fontSize: 14, color: "gray" },
});

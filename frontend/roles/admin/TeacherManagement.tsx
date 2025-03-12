import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Select,
  Input,
  Button,
  Text,
  Icon,
  FlatList,
  Pressable,
  Avatar,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import TeacherAccountCreateModal from "./TeacherAccountCreateModal";
import TeacherOptionsModal from "./TeacherOptionsModal";

const TeacherManagement = () => {
  const [faculty, setFaculty] = useState<string>(""); // Faculty state
  const [level, setLevel] = useState<string>(""); // Level state
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Dr.Zar Chi Su Su Hlaing",
      level: "Professor",
      faculty: "MATH",
      email: "zarchi@example.com",
    },
    {
      id: 2,
      name: "Dr. Aung Ko Ko",
      level: "Lecturer",
      faculty: "SCIENCE",
      email: "aungkoko@example.com",
    },
    // Add more sample teachers here as needed
  ]);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility for adding teacher
  const [optionsModalVisible, setOptionsModalVisible] = useState(false); // Modal visibility for teacher options
  const [selectedTeacher, setSelectedTeacher] = useState<{
    id: number;
    name: string;
    level: string;
    faculty: string;
    email: string;
  } | null>(null);

  // Add teacher function
  const addTeacher = (teacher: {
    name: string;
    level: string;
    email: string;
    faculty: string;
  }) => {
    setTeachers([
      ...teachers,
      {
        id: teachers.length + 1,
        name: teacher.name,
        level: teacher.level,
        email: teacher.email,
        faculty: faculty,
      },
    ]);
  };

  // Delete teacher function
  const deleteTeacher = (id: number) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  // Update teacher function
  const updateTeacher = (updatedTeacher: {
    id: number;
    name: string;
    level: string;
    email: string;
    faculty: string;
  }) => {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === updatedTeacher.id
          ? { ...teacher, ...updatedTeacher }
          : teacher
      )
    );
  };

  // Filter teachers by search term, faculty, and level
  const filteredTeachers = teachers.filter(
    (teacher) =>
      (!faculty || teacher.faculty === faculty) &&
      (!level || teacher.level === level) &&
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Teachers: ", filteredTeachers); // Debugging filtered teachers
  console.log("Selected level:", level); // Debugging level

  return (
    <Box safeArea p="4">
      {/* Filters */}
      <HStack space="2" mb="4">
        {/* Faculty dropdown */}
        <Select
          selectedValue={faculty}
          minWidth="100px"
          placeholder="Select Faculty"
          onValueChange={(value) => setFaculty(value)}
        >
          <Select.Item label="All Faculties" value="" />
          <Select.Item label="MATH" value="MATH" />
          <Select.Item label="SCIENCE" value="SCIENCE" />
          <Select.Item label="ENGINEERING" value="ENGINEERING" />
        </Select>

        {/* Level dropdown */}
        <Select
          selectedValue={level}
          minWidth="100px"
          placeholder="Select Level"
          onValueChange={(value) => setLevel(value)}
        >
          <Select.Item label="All Levels" value="" />
          <Select.Item label="Professor" value="Professor" />
          <Select.Item label="Lecturer" value="Lecturer" />
        </Select>

        {/* Search input */}
        <Input
          flex="1"
          placeholder="Search..."
          onChangeText={(text) => setSearchTerm(text)}
          InputLeftElement={
            <Icon as={Ionicons} name="search-outline" size="sm" ml="2" />
          }
        />
      </HStack>

      {/* Teacher List */}
      <Box bg="gray.100" p="4" borderRadius="md">
        <HStack justifyContent="space-between" alignItems="center" mb="2">
          <Text fontSize="md" fontWeight="bold">
            Teacher List
          </Text>
          <Button
            size="sm"
            colorScheme="primary"
            onPress={() => setModalVisible(true)}
          >
            Add Teacher
          </Button>
        </HStack>

        <FlatList
          data={filteredTeachers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HStack
              justifyContent="space-between"
              alignItems="center"
              py="2"
              borderBottomWidth="1"
              borderColor="gray.300"
            >
              <HStack alignItems="center">
                <Avatar size="sm" bg="gray.500">
                  <Icon as={Ionicons} name="person-outline" color="white" />
                </Avatar>
                <VStack ml="3">
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {item.faculty} - {item.level}
                  </Text>
                </VStack>
              </HStack>
              <Pressable
                onPress={() => {
                  setSelectedTeacher(item);
                  setOptionsModalVisible(true);
                }}
              >
                <Icon as={Ionicons} name="ellipsis-vertical" size="md" />
              </Pressable>
            </HStack>
          )}
        />
      </Box>

      {/* Teacher Creation Modal */}
      <TeacherAccountCreateModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={(teacher) => {
          addTeacher({ ...teacher, faculty });
        }}
      />

      {/* Teacher Options Modal */}
      <TeacherOptionsModal
        isOpen={optionsModalVisible}
        onClose={() => setOptionsModalVisible(false)}
        teacher={selectedTeacher}
        onDelete={deleteTeacher}
        onUpdate={(updatedTeacher) => {
          updateTeacher({ ...updatedTeacher, faculty });
        }}
      />
    </Box>
  );
};

export default TeacherManagement;

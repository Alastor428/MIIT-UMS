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
import StudentAccountCreateModal from "./StudentAccountCreateModal";
import StudentOptionsModal from "./StudentOptionsModal";

const StudentManagement = () => {
  const [batch, setBatch] = useState("");
  const [program, setProgram] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([
    { id: 1, name: "Swan Lynn Htun", idNumber: "2021-MIIT-CSE-068", email: "swanlynn@example.com" },
    { id: 2, name: "Mya Thida", idNumber: "2022-MIIT-ECE-072", email: "myathida@example.com" },
    // Add more students as needed
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{
    id: number;
    name: string;
    idNumber: string;
    email: string;
  } | null>(null);

  const addStudent = (student: { name: string; idNumber: string; email: string }) => {
    setStudents([...students, { id: students.length + 1, ...student }]);
  };

  const deleteStudent = (id: number) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const updateStudent = (updatedStudent: { id: number; name: string; idNumber: string; email: string }) => {
    setStudents(students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)));
  };

  const filteredStudents = students.filter(
    (student) =>
      (!batch || student.idNumber.startsWith(batch)) &&
      (!program || student.idNumber.includes(program)) &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box safeArea p="4">
      {/* Filters */}
      <HStack space="2" mb="4">
        <Select
          selectedValue={batch}
          minWidth="100px"
          placeholder="Batch"
          onValueChange={(value) => setBatch(value)}
        >
          <Select.Item label="All Batches" value="" />
          <Select.Item label="2021" value="2021" />
          <Select.Item label="2022" value="2022" />
        </Select>

        <Select
          selectedValue={program}
          minWidth="100px"
          placeholder="Program"
          onValueChange={(value) => setProgram(value)}
        >
          <Select.Item label="All Programs" value="" />
          <Select.Item label="CSE" value="CSE" />
          <Select.Item label="ECE" value="ECE" />
        </Select>

        <Input
          flex="1"
          placeholder="Search..."
          onChangeText={(text) => setSearchTerm(text)}
          InputLeftElement={<Icon as={Ionicons} name="search-outline" size="sm" ml="2" />}
        />
      </HStack>

      {/* Student List */}
      <Box bg="gray.100" p="4" borderRadius="md">
        <HStack justifyContent="space-between" alignItems="center" mb="2">
          <Text fontSize="md" fontWeight="bold">
            Student List
          </Text>
          <Button
            size="sm"
            colorScheme="primary"
            onPress={() => setModalVisible(true)}
          >
            Add Student
          </Button>
        </HStack>

        <FlatList
          data={filteredStudents}
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
                    {item.idNumber}
                  </Text>
                </VStack>
              </HStack>
              <Pressable
                onPress={() => {
                  setSelectedStudent(item);
                  setOptionsModalVisible(true);
                }}
              >
                <Icon as={Ionicons} name="ellipsis-vertical" size="md" />
              </Pressable>
            </HStack>
          )}
        />
      </Box>

      {/* Student Creation Modal */}
      <StudentAccountCreateModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={addStudent}
      />

      {/* Student Options Modal */}
      <StudentOptionsModal
        isOpen={optionsModalVisible}
        onClose={() => setOptionsModalVisible(false)}
        student={selectedStudent}
        onDelete={deleteStudent}
        onUpdate={updateStudent}
      />
    </Box>
  );
};

export default StudentManagement;

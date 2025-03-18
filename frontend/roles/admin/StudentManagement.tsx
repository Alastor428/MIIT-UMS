import React, { useEffect, useState } from "react";
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
import {
  get_all_students,
  get_student_by_email,
} from "@/api/student/get-student.api";
import { delete_student } from "@/api/student/delete-student.api";

export type Student = {
  id: string;
  name: string;
  roll_no: string;
  email: string;
  batch: string;
};

const StudentManagement = () => {
  const [batch, setBatch] = useState("");
  const [program, setProgram] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await get_all_students();
      const formattedStudents = response.students.map((student: any) => ({
        id: student._id,
        name: student.user.name,
        roll_no: student.roll_no,
        email: student.user.email,
        batch: student.batch,
      }));
      setStudents(formattedStudents);
    };
    fetchData();
  }, []);

  const [selectedStudent, setSelectedStudent] = useState<Student>(students[1]);

  const addStudent = (student: {
    name: string;
    idNumber: string;
    email: string;
  }) => {
    // setStudents([...students, { id: students.length + 1, ...student }]);
  };

  const deleteStudent = async (email: string) => {
    const student = await get_student_by_email(email);
    console.log(student);
    if (student) {
      const response = await delete_student(student._id);
      console.log(response);
    }
  };

  const updateStudent = (updatedStudent: {
    id: string;
    name: string;
    roll_no: string;
    email: string;
  }) => {
    // setStudents(
    //   students.map((student) =>
    //     student.id === updatedStudent.id ? updatedStudent : student
    //   )
    // );
  };
  const filteredStudents = students.filter((student) => {
    const programCode = student.roll_no.split("-")[2]; // Extracts "CSE" from "2021-MIIT-CSE-001"
    return (
      (!batch || student.batch === batch) &&
      (!program || programCode === program) &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
          {[...new Set(students.map((student) => student.batch))].map(
            (batchName) => (
              <Select.Item
                key={batchName}
                label={batchName}
                value={batchName}
              />
            )
          )}
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
          InputLeftElement={
            <Icon as={Ionicons} name="search-outline" size="sm" ml="2" />
          }
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
          keyExtractor={(item) => item.id}
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
                    {item.roll_no}
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

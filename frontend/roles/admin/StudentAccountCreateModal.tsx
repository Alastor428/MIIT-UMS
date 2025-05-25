import React, { useState } from "react";
import {
  Modal,
  Button,
  FormControl,
  Input,
  VStack,
  Toast,
  useToast,
} from "native-base";
import { create_student } from "@/api/student/create-student.api";

interface StudentAccountCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentAccountCreateModal: React.FC<StudentAccountCreateProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    batch: "",
    roll_no: "",
    gender: "",
    role: "student",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    Object.entries(student).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key.replace(/_/g, " ")} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateFields()) return;
    const response = await create_student(student);
    toast.show({
      title: "Success",
      description: "Student account created successfully.",
      placement: "top",
    });
    setStudent({
      name: "",
      email: "",
      password: "",
      batch: "",
      roll_no: "",
      gender: "",
      role: "student",
    });
    setErrors({});
    onClose();
  };

  const handleChange = (key: string, value: string) => {
    setStudent((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" })); // Clear error as user types
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Create Student Account</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <FormControl isInvalid={!!errors.name}>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                placeholder="Enter Name"
                value={student.name}
                onChangeText={(text) => handleChange("name", text)}
              />
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Enter Email"
                value={student.email}
                onChangeText={(text) => handleChange("email", text)}
              />
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                placeholder="Enter Password"
                type="password"
                value={student.password}
                onChangeText={(text) => handleChange("password", text)}
              />
              <FormControl.ErrorMessage>
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.roll_no}>
              <FormControl.Label>Roll Number</FormControl.Label>
              <Input
                placeholder="Enter Roll Number"
                value={student.roll_no}
                onChangeText={(text) => handleChange("roll_no", text)}
              />
              <FormControl.ErrorMessage>
                {errors.roll_no}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.gender}>
              <FormControl.Label>Gender</FormControl.Label>
              <Input
                placeholder="Enter Gender"
                value={student.gender}
                onChangeText={(text) => handleChange("gender", text)}
              />
              <FormControl.ErrorMessage>
                {errors.gender}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.batch}>
              <FormControl.Label>Batch</FormControl.Label>
              <Input
                placeholder="Enter Batch"
                value={student.batch}
                onChangeText={(text) => handleChange("batch", text)}
              />
              <FormControl.ErrorMessage>
                {errors.batch}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
        </Modal.Body>

        <Modal.Footer>
          <Button onPress={handleCreate}>Create</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default StudentAccountCreateModal;

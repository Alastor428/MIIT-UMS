import React, { useState } from "react";
import {
  Modal,
  Button,
  FormControl,
  Input,
  VStack,
  Checkbox,
  WarningOutlineIcon,
  useToast,
} from "native-base";
import { create_teacher } from "@/api/teacher/create-teacher.api";

interface TeacherAccountCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeacherAccountCreateModal: React.FC<TeacherAccountCreateProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const [HOD, setHOD] = useState(false);
  const [teacher, setTeacher] = useState({
    name: "",
    rank: "",
    department: "",
    email: "",
    isHOD: HOD,
    shortName: "",
    gender: "",
    password: "",
    role: "teacher",
  });

  const [errors, setErrors] = useState({
    name: "",
    rank: "",
    department: "",
    email: "",
    shortName: "",
    gender: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {
      name: "",
      rank: "",
      department: "",
      email: "",
      shortName: "",
      gender: "",
      password: "",
    };
    let isValid = true;

    if (!teacher.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (teacher.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (!teacher.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!teacher.shortName.trim()) {
      newErrors.shortName = "Short Name is required.";
      isValid = false;
    }
    if (!teacher.rank.trim()) {
      newErrors.rank = "Rank is required.";
      isValid = false;
    }
    if (!teacher.department.trim()) {
      newErrors.department = "Department is required.";
      isValid = false;
    }
    if (!teacher.gender.trim()) {
      newErrors.gender = "Gender is required.";
      isValid = false;
    }
    if (!teacher.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacher.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    try {
      console.log(teacher);
      await create_teacher(teacher);
      toast.show({
        title: "Success",
        description: "Teacher account created successfully.",
        placement: "top",
      });
      setTeacher({
        name: "",
        rank: "",
        department: "",
        email: "",
        isHOD: false,
        shortName: "",
        gender: "",
        password: "",
        role: "teacher",
      });
      setErrors({
        name: "",
        rank: "",
        department: "",
        email: "",
        shortName: "",
        gender: "",
        password: "",
      });
      onClose();
    } catch (error) {
      console.error("Failed to create teacher:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Create Teacher Account</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <FormControl isInvalid={!!errors.name}>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                placeholder="Enter Name"
                value={teacher.name}
                onChangeText={(text) => setTeacher({ ...teacher, name: text })}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.name}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.shortName}>
              <FormControl.Label>Short Name</FormControl.Label>
              <Input
                placeholder="Enter Short Name"
                value={teacher.shortName}
                onChangeText={(text) =>
                  setTeacher({ ...teacher, shortName: text })
                }
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.shortName}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.rank}>
              <FormControl.Label>Rank</FormControl.Label>
              <Input
                placeholder="Enter Rank"
                value={teacher.rank}
                onChangeText={(text) => setTeacher({ ...teacher, rank: text })}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.rank}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.department}>
              <FormControl.Label>Department</FormControl.Label>
              <Input
                placeholder="Enter Department"
                value={teacher.department}
                onChangeText={(text) =>
                  setTeacher({ ...teacher, department: text })
                }
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.department}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.gender}>
              <FormControl.Label>Gender</FormControl.Label>
              <Input
                placeholder="Enter Gender"
                value={teacher.gender}
                onChangeText={(text) =>
                  setTeacher({ ...teacher, gender: text })
                }
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.gender}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Enter Email"
                value={teacher.email}
                onChangeText={(text) => setTeacher({ ...teacher, email: text })}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                placeholder="Enter Password"
                type="password"
                value={teacher.password}
                onChangeText={(text) =>
                  setTeacher({ ...teacher, password: text })
                }
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>

            <Checkbox
              value="isHOD"
              isChecked={HOD}
              onChange={(val) => setHOD(val)}
            >
              Is Head of Department (HOD)
            </Checkbox>
          </VStack>
        </Modal.Body>

        <Modal.Footer>
          <Button onPress={handleCreate}>Create</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default TeacherAccountCreateModal;

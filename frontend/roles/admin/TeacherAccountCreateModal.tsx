import React, { useState } from "react";
import { Modal, Button, FormControl, Input, VStack } from "native-base";

interface TeacherAccountCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (teacher: { name: string; level: string; faculty: string ; email: string }) => void;
}

const TeacherAccountCreateModal: React.FC<TeacherAccountCreateProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [teacher, setTeacher] = useState({ name: "", level: "",faculty: "", email: "" });

  const handleCreate = () => {
    onCreate(teacher);
    setTeacher({ name: "", level: "",faculty: "", email: "" }); // Reset after creation
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Create Teacher Account</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                placeholder="Enter Name"
                value={teacher.name}
                onChangeText={(text) => setTeacher({ ...teacher, name: text })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Level</FormControl.Label>
              <Input
                placeholder="Enter Level"
                value={teacher.level}
                onChangeText={(text) =>
                  setTeacher({ ...teacher, level: text })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Faculty</FormControl.Label>
              <Input
                placeholder="Enter Faculty"
                value={teacher.faculty}
                onChangeText={(text) =>
                  setTeacher({ ...teacher, faculty: text })
                }
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Enter Email"
                value={teacher.email}
                onChangeText={(text) => setTeacher({ ...teacher, email: text })}
              />
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

export default TeacherAccountCreateModal;

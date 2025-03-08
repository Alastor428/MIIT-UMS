import React, { useState } from "react";
import { Modal, Button, FormControl, Input, VStack } from "native-base";

interface StudentAccountCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (student: { name: string; idNumber: string; email: string }) => void;
}

const StudentAccountCreateModal: React.FC<StudentAccountCreateProps> = ({ isOpen, onClose, onCreate }) => {
  const [student, setStudent] = useState({ name: "", idNumber: "", email: "" });

  const handleCreate = () => {
    onCreate(student);  // Pass the new student data back to the parent
    setStudent({ name: "", idNumber: "", email: "" }); // Reset fields
    onClose();  // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Create Student Account</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                placeholder="Enter Name"
                value={student.name}
                onChangeText={(text) => setStudent({ ...student, name: text })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Roll Number</FormControl.Label>
              <Input
                placeholder="Enter Roll Number"
                value={student.idNumber}
                onChangeText={(text) => setStudent({ ...student, idNumber: text })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Enter Email"
                value={student.email}
                onChangeText={(text) => setStudent({ ...student, email: text })}
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

export default StudentAccountCreateModal;

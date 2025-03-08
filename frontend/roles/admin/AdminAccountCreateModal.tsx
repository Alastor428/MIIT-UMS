import React, { useState } from "react";
import { Modal, Button, FormControl, Input, VStack } from "native-base";

interface AdminAccountCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (admin: { name: string; level: string; email: string }) => void;
}

const AdminAccountCreateModal: React.FC<AdminAccountCreateProps> = ({ isOpen, onClose, onCreate }) => {
  const [admin, setAdmin] = useState({ name: "", level: "", email: "" });

  const handleCreate = () => {
    onCreate(admin);  // Pass the new student data back to the parent
    setAdmin({ name: "", level: "", email: "" }); // Reset fields
    onClose();  // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Create Admin Account</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                placeholder="Enter Name"
                value={admin.name}
                onChangeText={(text) => setAdmin({ ...admin, name: text })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Level</FormControl.Label>
              <Input
                placeholder="Enter Level"
                value={admin.level}
                onChangeText={(text) => setAdmin({ ...admin, level: text })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Enter Email"
                value={admin.email}
                onChangeText={(text) => setAdmin({ ...admin, email: text })}
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

export default AdminAccountCreateModal;

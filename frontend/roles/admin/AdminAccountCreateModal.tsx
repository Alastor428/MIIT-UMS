import React, { useState } from "react";
import {
  Modal,
  Button,
  FormControl,
  Input,
  VStack,
  useToast,
  Spinner,
} from "native-base";
import { create_admin } from "@/api/admin/create-admin.api"; // ✅ Make sure this is a default export

interface AdminAccountCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminAccountCreateModal: React.FC<AdminAccountCreateProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();

  const [admin, setAdmin] = useState({
    name: "",
    adminRole: "",
    email: "",
    password: "",
    role: "admin",
    gender: "",
  });

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);

    try {
      await create_admin(admin); // ✅ Make sure this function matches expected API shape

      toast.show({
        title: "Admin Created",
        description: "New admin account has been successfully created.",
        // status: "success",
      });

      // Reset form only after success
      setAdmin({
        name: "",
        adminRole: "",
        email: "",
        password: "",
        role: "admin",
        gender: "",
      });

      onClose();
    } catch (error: any) {
      console.error("Admin creation error:", error);

      toast.show({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to create admin.",
      });
    } finally {
      setLoading(false);
    }
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
              <FormControl.Label>Email</FormControl.Label>
              <Input
                placeholder="Enter Email"
                value={admin.email}
                onChangeText={(text) => setAdmin({ ...admin, email: text })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                placeholder="Enter Password"
                value={admin.password}
                onChangeText={(text) => setAdmin({ ...admin, password: text })}
                secureTextEntry
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Gender</FormControl.Label>
              <Input
                placeholder="Enter Gender"
                value={admin.gender}
                onChangeText={(text) => setAdmin({ ...admin, gender: text })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Admin Role</FormControl.Label>
              <Input
                placeholder="Enter Admin Rank"
                value={admin.adminRole}
                onChangeText={(text) => setAdmin({ ...admin, adminRole: text })}
              />
            </FormControl>
          </VStack>
        </Modal.Body>

        <Modal.Footer>
          <Button onPress={handleCreate} isDisabled={loading}>
            {loading ? <Spinner color="white" /> : "Create"}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AdminAccountCreateModal;

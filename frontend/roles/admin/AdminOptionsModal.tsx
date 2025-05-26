import React, { useRef, useState, useEffect } from "react";
import {
  Modal,
  Button,
  VStack,
  Text,
  Input,
  HStack,
  AlertDialog,
} from "native-base";
import { Admin } from "./AdminManagement";
import { delete_admin } from "@/api/admin/delete-admin.api";

interface AdminOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: { id: string; name: string; adminRole: string; email: string } | null;
  onDelete: (id: string) => void;
  onUpdate: (updatedAdmin: {
    id: number;
    name: string;
    level: string;
    email: string;
  }) => void;
}

const AdminOptionsModal: React.FC<AdminOptionsModalProps> = ({
  isOpen,
  onClose,
  admin,
  onDelete,
  onUpdate,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editedAdmin, setEditedAdmin] = useState<{
    id: string;
    name: string;
    adminRole: string;
    email: string;
  } | null>(admin); // Initialize with student or null

  const cancelRef = useRef(null);

  useEffect(() => {
    if (editModal && admin) {
      setEditedAdmin(admin); // Set the selected student when editing
    }
  }, [editModal, admin]);

  if (!admin) return null;

  const deleteAdmin = async (id: string) => {
    console.log(id);
    try {
      const response = await delete_admin(id);
      console.log(response);
    } catch (e) {
      console.log("Error Deleting an Admin: ", e);
    }
  };

  const handleSaveChanges = () => {
    if (editedAdmin) {
      console.log("Calling onUpdate with", editedAdmin); // Log for debugging
      // onUpdate(editedAdmin);
      setEditModal(false);
    } else {
      console.error("onUpdate is undefined or editedAdmin is null");
    }
  };

  return (
    <>
      {/* Admin Info Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Admin Details</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Text fontWeight="bold">Name: {admin.name}</Text>
              <Text>Level: {admin.adminRole}</Text>
              <Text>Email: {admin.email}</Text>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <HStack space={3}>
              <Button colorScheme="blue" onPress={() => setEditModal(true)}>
                Manage Account
              </Button>
              <Button colorScheme="red" onPress={() => setConfirmDelete(true)}>
                Delete Account
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Edit Admin Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Account</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Input
                placeholder="Name"
                value={editedAdmin?.name || ""}
                onChangeText={(text) =>
                  setEditedAdmin({ ...editedAdmin!, name: text })
                }
              />
              <Input
                placeholder="Level"
                value={editedAdmin?.adminRole || ""}
                onChangeText={(text) =>
                  setEditedAdmin({ ...editedAdmin!, adminRole: text })
                }
              />
              <Input
                placeholder="Email"
                value={editedAdmin?.email || ""}
                onChangeText={(text) =>
                  setEditedAdmin({ ...editedAdmin!, email: text })
                }
              />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <HStack space={3}>
              <Button variant="ghost" onPress={() => setEditModal(false)}>
                Cancel
              </Button>
              <Button colorScheme="blue" onPress={handleSaveChanges}>
                Save Changes
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Delete Confirmation Modal */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Confirm Delete</AlertDialog.Header>
          <AlertDialog.Body padding={4}>
            Are you sure you want to delete this account?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button
              ref={cancelRef}
              variant="ghost"
              onPress={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onPress={() => {
                deleteAdmin(admin.id);
                setConfirmDelete(false);
                onClose();
              }}
            >
              Delete
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default AdminOptionsModal;

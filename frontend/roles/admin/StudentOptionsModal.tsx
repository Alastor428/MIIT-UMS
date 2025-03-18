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
import { Student } from "./StudentManagement";

interface StudentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  onDelete: (id: string) => void;
  onUpdate: (updatedStudent: {
    id: string;
    name: string;
    roll_no: string;
    email: string;
  }) => void;
}

const StudentOptionsModal: React.FC<StudentOptionsModalProps> = ({
  isOpen,
  onClose,
  student,
  onDelete,
  onUpdate,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editedStudent, setEditedStudent] = useState<Student>(student); // Initialize with student or null

  const cancelRef = useRef(null);

  useEffect(() => {
    if (editModal && student) {
      setEditedStudent(student); // Set the selected student when editing
    }
  }, [editModal, student]);

  if (!student) return null;

  const handleSaveChanges = () => {
    if (editedStudent && onUpdate) {
      console.log("Calling onUpdate with", editedStudent); // Log for debugging
      onUpdate(editedStudent);
      setEditModal(false);
    } else {
      console.error("onUpdate is undefined or editedStudent is null");
    }
  };

  return (
    <>
      {/* Student Info Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Student Details</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Text fontWeight="bold">Name: {student.name}</Text>
              <Text>Roll Number: {student.roll_no}</Text>
              <Text>Email: {student.email}</Text>
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

      {/* Edit Student Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Account</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Input
                placeholder="Name"
                value={editedStudent?.name || ""}
                onChangeText={(text) =>
                  setEditedStudent({ ...editedStudent!, name: text })
                }
              />
              <Input
                placeholder="Roll Number"
                value={editedStudent?.roll_no || ""}
                onChangeText={(text) =>
                  setEditedStudent({ ...editedStudent!, roll_no: text })
                }
              />
              <Input
                placeholder="Email"
                value={editedStudent?.email || ""}
                onChangeText={(text) =>
                  setEditedStudent({ ...editedStudent!, email: text })
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
                onDelete(student.email);
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

export default StudentOptionsModal;

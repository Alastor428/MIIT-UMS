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

interface TeacherOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: { id: number; name: string; level: string; faculty: string; email: string } | null;
  onDelete: (id: number) => void;
  onUpdate: (updatedTeacher: {
    id: number;
    name: string;
    faculty: string;
    level : string;
    email: string;
  }) => void;
}

const TeacherOptionsModal: React.FC<TeacherOptionsModalProps> = ({
  isOpen,
  onClose,
  teacher,
  onDelete,
  onUpdate,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState<{
    id: number;
    name: string;
    faculty: string;
    level: string;
    email: string;
  } | null>(teacher);

  const cancelRef = useRef(null);

  useEffect(() => {
    if (editModal && teacher) {
      setEditedTeacher(teacher); // Set the selected teacher when editing
    }
  }, [editModal, teacher]);

  if (!teacher) return null;

  const handleSaveChanges = () => {
    if (editedTeacher && onUpdate) {
      onUpdate(editedTeacher);
      setEditModal(false);
    }
  };

  return (
    <>
      {/* Teacher Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Teacher Details</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Text fontWeight="bold">Name: {teacher.name}</Text>
              <Text>Faculty: {teacher.faculty}</Text>
              <Text>Level: {teacher.level}</Text>
              <Text>Email: {teacher.email}</Text>
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

      {/* Edit Teacher Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Account</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Input
                placeholder="Name"
                value={editedTeacher?.name || ""}
                onChangeText={(text) =>
                  setEditedTeacher({ ...editedTeacher!, name: text })
                }
              />
              <Input
                placeholder="Faculty"
                value={editedTeacher?.faculty || ""}
                onChangeText={(text) =>
                  setEditedTeacher({ ...editedTeacher!, faculty: text })
                }
              />
              <Input
                placeholder="Level"
                value={editedTeacher?.level || ""}
                onChangeText={(text) =>
                  setEditedTeacher({ ...editedTeacher!, level: text })
                }
              />
              <Input
                placeholder="Email"
                value={editedTeacher?.email || ""}
                onChangeText={(text) =>
                  setEditedTeacher({ ...editedTeacher!, email: text })
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
            Are you sure you want to delete this  account?
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
                onDelete(teacher.id);
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

export default TeacherOptionsModal;

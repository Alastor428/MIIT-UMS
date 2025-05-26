import React, { useRef, useState, useEffect } from "react";
import {
  Modal,
  Button,
  VStack,
  Text,
  Input,
  HStack,
  AlertDialog,
  Switch,
} from "native-base";
import { delete_teacher } from "@/api/teacher/delete-teacher.api";
import { update_teacher } from "@/api/teacher/update-teacher.api";

interface TeacherOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: {
    id: string;
    name: string;
    email: string;
    department: string;
    rank: string;
    isHOD: boolean;
    shortName: string;
  } | null;
  token: string;
}

const TeacherOptionsModal: React.FC<TeacherOptionsModalProps> = ({
  isOpen,
  onClose,
  teacher,
  token,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editedTeacher, setEditedTeacher] =
    useState<TeacherOptionsModalProps["teacher"]>(teacher);
  const cancelRef = useRef(null);

  useEffect(() => {
    if (editModal && teacher) {
      setEditedTeacher(teacher); // Populate when opening edit modal
    }
  }, [editModal, teacher]);

  if (!teacher) return null;

  const handleDelete = async (id: string) => {
    await delete_teacher(id);
  };

  const handleSaveChanges = async () => {
    if (!editedTeacher) return;

    try {
      await update_teacher(editedTeacher, token);
      setEditModal(false);
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <>
      {/* View Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Teacher Details</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Text fontWeight="bold">Name: {teacher.name}</Text>
              <Text>Faculty: {teacher.department}</Text>
              <Text>Level: {teacher.rank}</Text>
              <Text>Email: {teacher.email}</Text>
              <Text>Short Name: {teacher.shortName}</Text>
              <Text>Is HOD: {teacher.isHOD ? "Yes" : "No"}</Text>
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

      {/* Edit Modal */}
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
                value={editedTeacher?.department || ""}
                onChangeText={(text) =>
                  setEditedTeacher({ ...editedTeacher!, department: text })
                }
              />
              <Input
                placeholder="Level"
                value={editedTeacher?.rank || ""}
                onChangeText={(text) =>
                  setEditedTeacher({ ...editedTeacher!, rank: text })
                }
              />
              <Input
                placeholder="Email"
                value={editedTeacher?.email || ""}
                onChangeText={(text) =>
                  setEditedTeacher({ ...editedTeacher!, email: text })
                }
              />
              <Input
                placeholder="Short Name"
                value={editedTeacher?.shortName || ""}
                onChangeText={(text) =>
                  setEditedTeacher({ ...editedTeacher!, shortName: text })
                }
              />
              <HStack alignItems="center" space={2}>
                <Text>Is HOD</Text>
                <Switch
                  isChecked={editedTeacher?.isHOD || false}
                  onToggle={() =>
                    setEditedTeacher({
                      ...editedTeacher!,
                      isHOD: !editedTeacher?.isHOD,
                    })
                  }
                />
              </HStack>
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

      {/* Delete Confirmation */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Confirm Delete</AlertDialog.Header>
          <AlertDialog.Body>
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
                handleDelete(teacher.id);
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

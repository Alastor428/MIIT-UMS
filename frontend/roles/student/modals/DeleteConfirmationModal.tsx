import React from "react";
import { Modal, Button, VStack } from "native-base";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <Button onPress={onConfirm} colorScheme="danger">
              Yes, Delete
            </Button>
            <Button onPress={onClose}>Cancel</Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteConfirmationModal;

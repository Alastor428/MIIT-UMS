import React from "react";
import { Modal, Button, VStack, Text } from "native-base";

interface AskingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseCourse: () => void;
  onCreateCourse: () => void;
}

const AskingModal: React.FC<AskingModalProps> = ({
  isOpen,
  onClose,
  onChooseCourse,
  onCreateCourse,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>What would you like to do?</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <Text>Select an option below to proceed:</Text>
            <Button onPress={onChooseCourse}>Choose an existing course</Button>
            <Button onPress={onCreateCourse}>Create a new course</Button>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default AskingModal;

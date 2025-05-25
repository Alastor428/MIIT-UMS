// MiniEventModal.tsx
import React from "react";
import { Modal, Text, Button, Box, VStack } from "native-base";

interface MiniEventModalProps {
  isVisible: boolean;
  onClose: () => void;
  event: {
    title: string;
    time: string;
    date: string;
    detail: string;
    sender: string;
    place: string;
  };
}

const MiniEventModal: React.FC<MiniEventModalProps> = ({
  isVisible,
  onClose,
  event,
}) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>{event.title}</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <Text fontSize="md">Detail: {event.detail}</Text>
            <Text fontSize="md">PLace: {event.place}</Text>
            <Text fontSize="md">Time: {event.time}</Text>
            <Text fontSize="md">Date: {event.date}</Text>
            <Text fontSize="md">From: {event.sender}</Text>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={onClose}>Close</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default MiniEventModal;

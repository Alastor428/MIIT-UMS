// MainEventModal.tsx
import React from "react";
import { Modal, Text, Button, Box, VStack } from "native-base";

interface MainEventModalProps {
  isVisible: boolean;
  onClose: () => void;
  event: {
    title: string;
    details: string;
    time: string;
    place: string;
    sender: string;
    date: string;
  };
}

const MainEventModal: React.FC<MainEventModalProps> = ({
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
            <Text fontSize="md">{event.details}</Text>
            <Text fontSize="sm">Place: {event.place}</Text>
            <Text fontSize="sm">Time: {event.time}</Text>
            <Text fontSize="sm">Sent from: {event.sender}</Text>
            <Text fontSize="sm">Date: {event.date}</Text>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={onClose}>Close</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default MainEventModal;

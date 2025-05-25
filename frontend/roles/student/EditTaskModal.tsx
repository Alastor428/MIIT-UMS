import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  VStack,
  FormControl,
  Select,
  CheckIcon,
} from "native-base";
import { Task } from "./types";

interface EditTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  task: Task;
  onEditTask: (updatedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isVisible,
  onClose,
  task,
  onEditTask,
}) => {
  const [taskDetails, setTaskDetails] = useState<Task>({ ...task });

  useEffect(() => {
    setTaskDetails({ ...task });
  }, [task]);

  const handleSave = () => {
    onEditTask(taskDetails);
    onClose();
  };

  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Edit Task</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <FormControl>
              <FormControl.Label>Title</FormControl.Label>
              <Input
                value={taskDetails.title}
                onChangeText={(text) =>
                  setTaskDetails({ ...taskDetails, title: text })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Details</FormControl.Label>
              <Input
                value={taskDetails.details}
                onChangeText={(text) =>
                  setTaskDetails({ ...taskDetails, details: text })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Color</FormControl.Label>
              <Select
                selectedValue={taskDetails.color}
                placeholder="Select color"
                minWidth="200"
                onValueChange={(value) =>
                  setTaskDetails({ ...taskDetails, color: value })
                }
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />,
                }}
              >
                <Select.Item label="Red" value="red.200" />
                <Select.Item label="Blue" value="blue.200" />
                <Select.Item label="Green" value="green.200" />
                <Select.Item label="Yellow" value="yellow.200" />
              </Select>
            </FormControl>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button onPress={handleSave}>Save</Button>
            <Button variant="ghost" onPress={onClose}>
              Cancel
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default EditTaskModal;

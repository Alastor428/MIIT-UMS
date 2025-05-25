import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  VStack,
  FormControl,
  Select,
  CheckIcon,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Task } from "./types";

interface AddTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddTask: (newTask: Task) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isVisible,
  onClose,
  onAddTask,
}) => {
  const [taskDetails, setTaskDetails] = useState<Task>({
    id: Date.now(),
    title: "",
    details: "",
    color: "",
    dueDate: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSave = () => {
    onAddTask({ ...taskDetails, dueDate: selectedDate.toDateString() });
    setTaskDetails({
      id: Date.now(),
      title: "",
      details: "",
      color: "",
      dueDate: "",
    });
    onClose();
  };

  const handleDateChange = (_event: any, date?: Date) => {
    if (date) setSelectedDate(date);
    setShowDatePicker(false);
  };

  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add Task</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <FormControl>
              <FormControl.Label>Title</FormControl.Label>
              <Input
                placeholder="Enter task title"
                value={taskDetails.title}
                onChangeText={(text) =>
                  setTaskDetails({ ...taskDetails, title: text })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Details</FormControl.Label>
              <Input
                placeholder="Enter task details"
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
                minWidth="200"
                placeholder="Select a color"
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
            <FormControl>
              <FormControl.Label>Due Date</FormControl.Label>
              <Button onPress={() => setShowDatePicker(true)} variant="outline">
                {selectedDate.toDateString()}
              </Button>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
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

export default AddTaskModal;

import React, { useState } from "react";
import { Modal, Button, Input, VStack, HStack, Text } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

interface CreateEventFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (eventData: any) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    details: "",
    timeFrom: "",
    timeTo: "",
    date: "",
    place: "",
    sender: "",
    priority: "high",
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTimeField, setSelectedTimeField] = useState<
    "timeFrom" | "timeTo" | null
  >(null);

  const handleDateConfirm = (_: any, selectedDate?: Date) => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setEventDetails({
        ...eventDetails,
        date: selectedDate.toLocaleDateString(),
      });
    }
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (event: any, selectedTime: Date | undefined) => {
    if (selectedTimeField) {
      const formattedTime = selectedTime
        ? selectedTime.toLocaleTimeString()
        : "";
      setEventDetails({ ...eventDetails, [selectedTimeField]: formattedTime });
    }
    setTimePickerVisibility(false);
  };

  const handleSubmit = () => {
    onSubmit(eventDetails);
    setEventDetails({
      title: "",
      details: "",
      timeFrom: "",
      timeTo: "",
      date: "",
      place: "",
      sender: "",
      priority: "high",
    });
  };

  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Create New Event</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <Text>Event Title</Text>
            <Input
              placeholder="Enter the title"
              value={eventDetails.title}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, title: text })
              }
            />
            <Text>Event Details</Text>
            <Input
              placeholder="Enter the details"
              value={eventDetails.details}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, details: text })
              }
            />
            <Text>Event Time</Text>
            <HStack space={2}>
              <Button
                flex={1}
                onPress={() => {
                  setSelectedTimeField("timeFrom");
                  setTimePickerVisibility(true);
                }}
                color={"#3B82F6"}
              >
                From: {eventDetails.timeFrom || "Select Time"}
              </Button>
              <Button
                flex={1}
                onPress={() => {
                  setSelectedTimeField("timeTo");
                  setTimePickerVisibility(true);
                }}
                color={"#3B82F6"}
              >
                To: {eventDetails.timeTo || "Select Time"}
              </Button>
            </HStack>
            <Text>Event Date</Text>
            <Input
              placeholder="Select the date"
              value={eventDetails.date}
              onFocus={() => setDatePickerVisibility(true)}
            />
            <Text>Event Location</Text>
            <Input
              placeholder="Enter the location"
              value={eventDetails.place}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, place: text })
              }
            />
            <Text>Sender</Text>
            <Input
              placeholder="Enter the sender's name"
              value={eventDetails.sender}
              onChangeText={(text) =>
                setEventDetails({ ...eventDetails, sender: text })
              }
            />
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={3}>
            <Button
              colorScheme="blue"
              onPress={handleSubmit}
              px={5}
              py={2}
              borderRadius={10}
            >
              Submit
            </Button>
            <Button
              colorScheme="red"
              onPress={onClose}
              px={5}
              py={2}
              borderRadius={10}
            >
              Cancel
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>

      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateConfirm}
        />
      )}
      {isTimePickerVisible && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={handleTimeConfirm}
        />
      )}
    </Modal>
  );
};

export default CreateEventForm;

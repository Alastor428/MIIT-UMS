import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Box, Text, VStack, HStack, Button } from "native-base";
import { Calendar, DateData } from "react-native-calendars";
import MainEventModal from "../student/MainEventModal";
import CreateEventForm from "./CreateEventForm";
import {
  get_all_events,
  get_events_by_priority,
} from "@/api/event/get-event.api";
import { create_event } from "@/api/event/create-event.api";

const { width: screenWidth } = Dimensions.get("window");

interface MainEvent {
  id: string;
  title: string;
  details: string;
  time: string;
  place: string;
  date: string; // Ensure the date is a string
  sender: string;
}

interface CreateEvent {
  title: string;
  details: string;
  time: string;
  place: string;
  date: string; // Ensure the date is a string
  sender: string;
  priority: string;
}

interface Raw {
  title: string;
  details: string;
  timeFrom: string;
  timeTo: string;
  place: string;
  date: string; // Ensure the date is a string
  sender: string;
  priority: string;
}

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

interface Event_Planner_Props {
  token: string;
}

const Event_Planner: React.FC<Event_Planner_Props> = ({ token }) => {
  const [mainEvents, setMainEvents] = useState<MainEvent[]>([]);

  const handleRefresh = () => {
    const fetchData = async () => {
      const response = await get_events_by_priority("high");
      setMainEvents(response);
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await get_events_by_priority("high");
      setMainEvents(response);
    };
    fetchData();
  }, []);

  const [isMainEventModalVisible, setMainEventModalVisible] = useState(false);
  const [selectedMainEvent, setSelectedMainEvent] = useState<MainEvent | null>(
    null
  );
  const [isCreateEventFormVisible, setCreateEventFormVisible] = useState(false);

  const openMainEventModal = (event: MainEvent) => {
    setSelectedMainEvent(event);
    setMainEventModalVisible(true);
  };

  const closeMainEventModal = () => {
    setMainEventModalVisible(false);
    setSelectedMainEvent(null);
  };

  const openCreateEventForm = () => {
    setCreateEventFormVisible(true);
  };

  const closeCreateEventForm = () => {
    setCreateEventFormVisible(false);
  };

  const handleCreateEvent = async (newEvent: Raw) => {
    const time = `${formatTime(newEvent.timeFrom)} - ${formatTime(
      newEvent.timeTo
    )}`;
    const [day, month, year] = newEvent.date.split("/");
    const formattedDate = `${year}-${month}-${day}`;

    const formattedEvent: CreateEvent = {
      title: newEvent.title,
      details: newEvent.details,
      time,
      place: newEvent.place,
      date: formattedDate,
      sender: newEvent.sender,
      priority: newEvent.priority,
    };

    const response = await create_event(formattedEvent);
    console.log(response);
    handleRefresh();
    closeCreateEventForm();
  };

  const renderMainEvent = ({
    id,
    title,
    details,
    time,
    sender,
    date,
    place,
  }: MainEvent) => {
    const maxLength = 100;

    return (
      <Box
        key={id}
        bg="rgb(255, 219, 99)"
        borderRadius="20px"
        padding={5}
        shadow={8}
        margin={5}
        width={screenWidth - 40}
        height={200}
        justifyContent="space-between"
      >
        <VStack space={2} flex={1}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="black"
            textAlign="left"
            //marginBottom={5}
            marginTop={-5}
          >
            {title}
          </Text>

          <View style={{ flexGrow: 1 }}>
            <Text
              fontSize="15"
              fontWeight="small"
              color="black"
              numberOfLines={details.length > maxLength ? 3 : undefined}
            >
              {details.length > maxLength
                ? details.substring(0, maxLength) + "..."
                : details}
            </Text>
            {details.length > maxLength && (
              <Text fontSize="sm" color="blue" fontWeight="bold">
                See more
              </Text>
            )}
          </View>
          <Text fontSize="lg" color="black" marginBottom={-4}>
            {date.split("T")[0]}
          </Text>

          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" color="black" textAlign="left">
              {time}
            </Text>
            <Button
              size="sm"
              bgColor="rgb(255, 255, 255)"
              onPress={() =>
                openMainEventModal({
                  id,
                  title,
                  details,
                  time,
                  place,
                  sender,
                  date: date.split("T")[0],
                })
              }
            >
              <Text color={"black"}>View Details</Text>
            </Button>
          </HStack>
        </VStack>
      </Box>
    );
  };

  // Initialize the accumulator object for marked dates
  const markedDates: { [key: string]: { selected: boolean } } = {};

  mainEvents.forEach((event) => {
    markedDates[event.date.split("T")[0]] = { selected: true }; // Mark the event date
  });

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {mainEvents.map((event) => renderMainEvent(event))}
      </ScrollView>
      {/* Calendar Section */}
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarTitle}>Event Dates</Text>
        <Calendar
          markingType={"simple"}
          markedDates={markedDates}
          style={{
            transform: [{ scale: 0.8 }], // Adjust the scale factor to make the calendar smaller
            height: 320,
          }}
          onDayPress={(day: DateData) => {
            console.log("Selected day", day);
          }}
        />
      </View>
      <Button onPress={openCreateEventForm}>Create New Event</Button>
      {selectedMainEvent && (
        <MainEventModal
          isVisible={isMainEventModalVisible}
          onClose={closeMainEventModal}
          event={selectedMainEvent}
        />
      )}
      <CreateEventForm
        isVisible={isCreateEventFormVisible}
        onClose={closeCreateEventForm}
        onSubmit={handleCreateEvent}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
  },
  sectionCaption: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "left",
    marginLeft: 20,
    marginTop: 0,
    marginBottom: -10,
  },
  calendarContainer: {
    margin: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: -20,
  },
});

export default Event_Planner;

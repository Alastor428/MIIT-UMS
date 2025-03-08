import React, { useState } from "react";
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

const { width: screenWidth } = Dimensions.get("window");

interface MainEvent {
  id: number;
  title: string;
  details: string;
  time: string;
  place: string;
  date: string; // Ensure the date is a string
  sender: string;
}

const Event_Planner: React.FC = () => {
  const [mainEvents, setMainEvents] = useState<MainEvent[]>([
    {
      id: 1,
      title: "Special Project Talk Show 1",
      details:
        "ကျောင်းတွင်း Special Projectများနှင့်ပတ်သတ်၍ ဆွေးနွေးတိုင်ပင်လိုသည်များကို ကျောင်းသူကျောင်းသားနှင့် ကျောင်းသင်ကြားရေး တာဝန်ရှိသူများ အကြား ရှင်းရှင်းလင်းလင်းနှင့် တိကျစွာ တင်ပြနိုင်ရန် 2021 batch ကျောင်းသူ/ကျောင်းသားများမှ အစ 2024 batch ကျောင်းသူ/ကျောင်းသားများ အားလုံးပါဝင်တက်ရောက်ပါရန် ဖိတ်ကြားအပ်ပါသည်။",
      time: "4:00 - 6:00 PM",
      place: "Room 101",
      date: "2025-02-15",
      sender: "Faculty of Engineering",
    },
    {
      id: 2,
      title: "ဟောပြောပွဲ",
      details:
        "ယာဉ်အန္တရာယ်ကင်းရှင်းရေး အသိပညာပေးဟောပြောပွဲအခမ်းအနားကို ၁၇-၁-၂၀၂၅ ရက်နေ့ Auditorium ခန်းမ၌ ကျင်းပပြုလုပ်သွားမည်ဖြစ်ပါသဖြင့် ၂၀၂၄-၂၀၂၅ ပညာသင်နှစ် သင်တန်းနှစ် အသီးသီးတွင် တက်‌ရောက်ပညာသင်ကြားနေသော ကျောင်းသား၊ ကျောင်းသူများအနေဖြင့် Uniform အပြည့်အစုံဝတ်ဆင်၍ နံနက် ၁၀နာရီအချိန်တွင် ခန်းမအတွင်း နေရာယူပေးကြပါရန် အသိပေး အကြောင်းကြားပါသည်။",
      time: "1:00 - 3:00 PM",
      place: "Hall",
      date: "2025-02-10",
      sender: "Student Affair",
    },
  ]);

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

  const handleCreateEvent = (newEvent: any) => {
    const formattedTime = `${newEvent.timeFrom} - ${newEvent.timeTo}`;

    setMainEvents((prevEvents) => [
      ...prevEvents,
      {
        ...newEvent,
        id: prevEvents.length + 1,
        time: formattedTime,
      },
    ]);

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
            {date}
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
                  date,
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
    markedDates[event.date] = { selected: true }; // Mark the event date
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

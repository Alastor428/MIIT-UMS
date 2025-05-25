import React, { useState } from "react";
import {
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Box, Text, VStack, HStack, Button } from "native-base";
import MainEventModal from "./MainEventModal";
import MiniEventModal from "./MiniEventModal";

const { width: screenWidth } = Dimensions.get("window");

const Teacher_Event = () => {
  const mainEvents = [
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
        "ယာဉ်အန္တရာယ်ကင်းရှင်းရေး အသိပညာပေးဟောပြောပွဲအခမ်းအနားကို ၁၇-၁-၂၀၂၅ ရက်နေ့ Auditorium ခန်းမ၌ ကျင်းပပြုလုပ်သွားမည်ဖြစ်ပါသဖြင့် ၂၀၂၄-၂၀၂၅ ပညာသင်နှစ် သင်တန်းနှစ် အသီးသီးတွင် တက်‌ရောက်ပညာသင်ကြားနေသော ကျောင်းသား၊ ကျောင်းသူများအနေဖြင့် Uniform အပြည့်အစုံဝတ်ဆင်၍ နံနက် ၁၀နာရီအချိန်တွင် ခန်းမအတွင်း နေရာယူပေးကြပါရန် အသိပေး အကြောင်းကြားပါသည်။",
      time: "1:00 - 3:00 PM",
      place: "Hall",
      date: "2025-02-10",
      sender: "Student Affair",
    },
  ];

  const miniEvents = [
    {
      id: 1,
      title: "Quiz",
      time: "10:00 - 11:00 AM",
      date: "2025-02-05",
      place: "Room 201",
      sender: "Instructor",
      details: "Tutorial Quizz",
    },
    {
      id: 3,
      title: "Quiz",
      time: "10:00 - 11:00 AM",
      date: "2025-02-05",
      place: "Room 201",
      sender: "Instructor",
      details: "Tutorial Quizz",
    },
    {
      id: 2,
      title: "Quiz",
      time: "10:00 - 11:00 AM",
      date: "2025-02-05",
      place: "Room 201",
      sender: "Instructor",
      details: "Tutorial Quizz",
    },
  ];

  const [isMainEventModalVisible, setMainEventModalVisible] = useState(false);
  const [isMiniEventModalVisible, setMiniEventModalVisible] = useState(false);
  const [selectedMainEvent, setSelectedMainEvent] = useState(null);
  const [selectedMiniEvent, setSelectedMiniEvent] = useState(null);

  const openMainEventModal = (event: any) => {
    setSelectedMainEvent(event);
    setMainEventModalVisible(true);
  };

  const closeMainEventModal = () => {
    setMainEventModalVisible(false);
    setSelectedMainEvent(null);
  };

  const openMiniEventModal = (event: any) => {
    setSelectedMiniEvent(event);
    setMiniEventModalVisible(true);
  };

  const closeMiniEventModal = () => {
    setMiniEventModalVisible(false);
    setSelectedMiniEvent(null);
  };

  const renderMainEvent = ({
    id,
    title,
    details,
    time,
    sender,
    date,
    place,
  }: {
    id: number;
    title: string;
    details: string;
    time: string;
    sender: string;
    place: string;
    date: string;
  }) => {
    const maxLength = 100; // Max characters before showing "See more"

    return (
      <Box
        bg="rgb(255, 219, 99)"
        borderRadius="20px"
        padding={5}
        shadow={3}
        margin={5}
        width={screenWidth - 40}
        height={350}
        justifyContent="space-between"
      >
        <VStack space={2} flex={1}>
          {/* Title Section */}
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="black"
            textAlign="left"
            marginBottom={5}
          >
            {title}
          </Text>

          {/* Details Section with See More */}
          <View style={{ flexGrow: 1 }}>
            <Text
              fontSize="md"
              fontWeight="small"
              color="black"
              numberOfLines={details.length > maxLength ? 3 : undefined} // Limit to 3 lines if the text is too long
            >
              {details.length > maxLength
                ? details.substring(0, maxLength) + "..."
                : details}
            </Text>
            {/* Show "See more" if the text exceeds maxLength */}
            {details.length > maxLength && (
              <Text fontSize="sm" color="blue" fontWeight="bold">
                See more
              </Text>
            )}
          </View>

          {/* Date Section */}
          <Text fontSize="lg" color="black" marginBottom={2}>
            {date} {/* Display the date here */}
          </Text>

          {/* Time and View Detail Section */}
          <HStack justifyContent="space-between" alignItems="center">
            {/* Time on the left */}
            <Text fontSize="lg" color="black" textAlign="left">
              {time}
            </Text>
            {/* View Detail button on the right */}
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

  const renderMiniEvent = ({
    id,
    title,
    time,
    date,
    place,
    sender,
    details,
  }: {
    id: number;
    title: string;
    time: string;
    date: string;
    place: string;
    sender: string;
    details: string;
  }) => (
    <TouchableOpacity
      onPress={() =>
        openMiniEventModal({ id, title, time, date, place, sender, details })
      }
    >
      <Box
        bg="#ADD8E6"
        borderRadius="20px"
        padding={5}
        shadow={3}
        margin={5}
        width={(screenWidth - 100) / 2}
        height={150}
      >
        <VStack space={1}>
          <Text fontSize="md" fontWeight="bold" color="black">
            {title}
          </Text>
          <Text fontSize="sm" color="black">
            {time}
          </Text>
          <Text fontSize="sm" color="black">
            {date}
          </Text>
        </VStack>
      </Box>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Main Event Section */}
      <Text style={styles.sectionCaption}>Main Event</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {mainEvents.map((event) => renderMainEvent(event))}
      </ScrollView>

      {/* Mini Event Section */}
      <Text style={styles.sectionCaption}>Mini Events</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.miniEventContainer}
        snapToAlignment="center"
        snapToInterval={Dimensions.get("window").width * 0.8} // Adjust based on item width
        decelerationRate="fast"
      >
        {miniEvents.map((event) => renderMiniEvent(event))}
      </ScrollView>

      {/* Main Event Modal */}
      {selectedMainEvent && (
        <MainEventModal
          isVisible={isMainEventModalVisible}
          onClose={closeMainEventModal}
          event={selectedMainEvent}
        />
      )}

      {/* Mini Event Modal */}
      {selectedMiniEvent && (
        <MiniEventModal
          isVisible={isMiniEventModalVisible}
          onClose={closeMiniEventModal}
          event={selectedMiniEvent}
        />
      )}
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
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    marginLeft: 20,
    marginVertical: 0,
  },
  miniEventContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default Teacher_Event;

import React, { useEffect, useState } from "react";
import { Box, Avatar, Text, VStack, Pressable, Button } from "native-base";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "./navigationTypes";

interface SidebarProps {
  navigation: DrawerNavigationProp<DrawerParamList>;
  teacherData: Record<string, any>;
  onLogout: () => void;
}

const Teacher_Sidebar: React.FC<SidebarProps> = ({
  navigation,
  teacherData,
  onLogout,
}) => {
  const [name, setName] = useState(teacherData.user?.name || "Loading...");
  useEffect(() => {
    if (teacherData.user?.name && teacherData.user.name !== name) {
      setName(teacherData.user.name);
    }
  }, [teacherData.user?.name]);
  return (
    <Box flex={1} bg="white" p={4} justifyContent={"space-between"}>
      <Box>
        {/* Profile Section */}
        <Box alignItems="flex-start" mb={6}>
          <Avatar
            size="xl"
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFv3zhivTb0-F68WalciqjfH-ozebDhMKiQ&s", // Replace with actual profile pic URL
            }}
          />
          <Text fontSize="lg" fontWeight="bold" mt={3}>
            {name}
          </Text>
          <Text fontSize="md" color="gray.500">
            {teacherData.rank}
          </Text>
        </Box>

        <VStack space={4}>
          <Pressable onPress={() => navigation.navigate("Dashboard")}>
            <Text fontSize="md">Dashboard</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Timetable")}>
            <Text fontSize="md">Timetable</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Chat")}>
            <Text fontSize="md">Chat</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Events")}>
            <Text fontSize="md">Events</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ToDoList")}>
            <Text fontSize="md">To-Do List</Text>
          </Pressable>
          {/* <Pressable onPress={() => navigation.navigate("About")}>
            <Text fontSize="md">About</Text>
          </Pressable> */}
          <Pressable onPress={() => navigation.navigate("Chatbot")}>
            <Text fontSize="md">Chatbot</Text>
          </Pressable>
        </VStack>
        {/* Logout Button
      <Button mt={6} onPress={handleLogout}>
        Logout
      </Button> */}
      </Box>
      {/* Logout Button */}
      <Pressable onPress={onLogout} mt={6}>
        <Box
          bg="red.100"
          p={3}
          borderRadius="md"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="md" color="red.600" fontWeight="bold">
            Log Out
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default Teacher_Sidebar;

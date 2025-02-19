import React from "react";
import { Box, Avatar, Text, VStack, Pressable } from "native-base";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "./navigationTypes"; // Ensure correct import

interface SidebarProps {
  navigation: DrawerNavigationProp<DrawerParamList>; // Correct type for navigation prop
}

const Student_Sidebar: React.FC<SidebarProps> = ({ navigation }) => {
  return (
    <Box flex={1} bg="white" p={4}>
      {/* Profile Section */}
      <Box alignItems="flex-start" mb={6}>
        <Avatar
          size="xl"
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFv3zhivTb0-F68WalciqjfH-ozebDhMKiQ&s", // Replace with actual profile pic URL
          }}
        />
        <Text fontSize="lg" fontWeight="bold" mt={3}>
          Ye Khant Lwin
        </Text>
        <Text fontSize="md" color="gray.500">
          Role No: 2021-MIIT-CSE-091
        </Text>
      </Box>

      {/* Navigation Items */}
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
        <Pressable onPress={() => navigation.navigate("About")}>
          <Text fontSize="md">About</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Chatbot")}>
          <Text fontSize="md">Chatbot</Text>
        </Pressable>
      </VStack>
    </Box>
  );
};

export default Student_Sidebar;

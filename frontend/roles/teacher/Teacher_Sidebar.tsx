import React from "react";
import { Box, Avatar, Text, VStack, Pressable, Button } from "native-base";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "./navigationTypes";

interface SidebarProps {
  navigation: DrawerNavigationProp<DrawerParamList>;
}

const Teacher_Sidebar: React.FC<SidebarProps> = ({ navigation }) => {
 
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
          Daw Zar Chi Su Su Hlaing
        </Text>
        <Text fontSize="md" color="gray.500">
          Professor
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
        <Pressable onPress={() => navigation.navigate("About")}>
          <Text fontSize="md">About</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Chatbot")}>
          <Text fontSize="md">Chatbot</Text>
        </Pressable>
      </VStack>
      {/* Logout Button
      <Button mt={6} onPress={handleLogout}>
        Logout
      </Button> */}
    </Box>
  );
};

export default Teacher_Sidebar;

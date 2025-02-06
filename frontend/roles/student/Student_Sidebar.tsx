import React from "react";
import { Box, Avatar, Text, VStack, Pressable } from "native-base";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "./navigationTypes"; 
interface SidebarProps {
  navigation: DrawerNavigationProp<DrawerParamList>; 
}

const Student_Sidebar: React.FC<SidebarProps> = ({ navigation }) => {
  return (
    <Box flex={1} bg="white" p={4}>
      {/* Profile Section */}
      <Box alignItems="flex-start" mb={6}>
        <Avatar
          size="xl"
          source={{
            uri: "https://example.com/profile-pic.jpg", 
          }}
        />
        <Text fontSize="lg" fontWeight="bold" mt={3}>
          John Doe
        </Text>
        <Text fontSize="md" color="gray.500">
          Role No: 12345
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
    </Box>
  );
};

export default Student_Sidebar;

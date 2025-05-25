import React from "react";
import { Box, Avatar, Text, VStack, Pressable, Button } from "native-base";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "./navigationTypes";
interface SidebarProps {
  navigation: DrawerNavigationProp<DrawerParamList>;
}

const Admin_Sidebar: React.FC<SidebarProps> = ({ navigation }) => {
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
          Daw Win Aye
        </Text>
        <Text fontSize="md" color="gray.500">
          High Level Admin
        </Text>
      </Box>

      <VStack space={4}>
        <Pressable onPress={() => navigation.navigate("Admin")}>
          <Text fontSize="md">Admin</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Teacher")}>
          <Text fontSize="md">Teacher</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Student")}>
          <Text fontSize="md">Student</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("TimeTable")}>
          <Text fontSize="md">TimeTable</Text>
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

export default Admin_Sidebar;

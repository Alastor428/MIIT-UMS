import React from "react";
import { Box, Avatar, Text, VStack, Pressable } from "native-base";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "./navigationTypes";

interface SidebarProps {
  navigation: DrawerNavigationProp<DrawerParamList>;
  onLogout: () => void;
}

const Admin_Sidebar: React.FC<SidebarProps> = ({ navigation, onLogout }) => {
  return (
    <Box flex={1} bg="white" p={4} justifyContent="space-between">
      <Box>
        {/* Profile Info */}
        <Box alignItems="flex-start" mb={6}>
          <Avatar
            size="xl"
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFv3zhivTb0-F68WalciqjfH-ozebDhMKiQ&s",
            }}
          />
          <Text fontSize="lg" fontWeight="bold" mt={3}>
            Daw Win Aye
          </Text>
          <Text fontSize="md" color="gray.500">
            High Level Admin
          </Text>
        </Box>

        {/* Navigation Links */}
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

      {/* Logout */}
      <Pressable onPress={onLogout}>
        <Box
          bg="red.100"
          p={3}
          borderRadius="md"
          alignItems="center"
          justifyContent="center"
        ></Box>
        <Text fontSize="md" color="red.600" fontWeight="bold">
          Log Out
        </Text>
      </Pressable>
    </Box>
  );
};

export default Admin_Sidebar;

import React, { useEffect, useState } from "react";
import { Box, Avatar, Text, VStack, Pressable, Button } from "native-base";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "./navigationTypes";
interface SidebarProps {
  navigation: DrawerNavigationProp<DrawerParamList>;
  onLogout: () => void;
  adminData: Record<string, any>;
}

const Admin_Sidebar: React.FC<SidebarProps> = ({
  navigation,
  onLogout,
  adminData,
}) => {
  const [name, setName] = useState(adminData.user?.name || "Loading...");
  useEffect(() => {
    if (adminData.user?.name && adminData.user.name !== name) {
      setName(adminData.user.name);
    }
  }, [adminData.user?.name]);
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
            {name} admin
          </Text>
          <Text fontSize="md" color="gray.500">
            {adminData.adminRole}
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
          {/* <Pressable onPress={() => navigation.navigate("ToDoList")}>
            <Text fontSize="md">To-Do List</Text>
          </Pressable> */}
          {/* <Pressable onPress={() => navigation.navigate("About")}>
            <Text fontSize="md">About</Text>
          </Pressable> */}
          <Pressable onPress={() => navigation.navigate("Chatbot")}>
            <Text fontSize="md">Chatbot</Text>
          </Pressable>
        </VStack>
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

export default Admin_Sidebar;

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Box, Text } from "native-base";
import Student_Sidebar from "./Student_Sidebar";
import StudentHeader from "./StudentHeader";

const Drawer = createDrawerNavigator();

// Example Screens
const Screen: React.FC<{ name: string }> = ({ name }) => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text fontSize="lg">{name} Screen</Text>
  </Box>
);

const Student_Layout: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Student_Sidebar {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 300, // Adjust the width as per your design
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={() => <Screen name="Dashboard" />}
        options={{
          header: ({ navigation }) => (
            <StudentHeader onSidebarToggle={navigation.openDrawer} />
          ),
        }}
      />
      <Drawer.Screen
        name="Timetable"
        component={() => <Screen name="Timetable" />}
        options={{
          header: ({ navigation }) => (
            <StudentHeader onSidebarToggle={navigation.openDrawer} />
          ),
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={() => <Screen name="Chat" />}
        options={{
          header: ({ navigation }) => (
            <StudentHeader onSidebarToggle={navigation.openDrawer} />
          ),
        }}
      />
      <Drawer.Screen
        name="Events"
        component={() => <Screen name="Events" />}
        options={{
          header: ({ navigation }) => (
            <StudentHeader onSidebarToggle={navigation.openDrawer} />
          ),
        }}
      />
      <Drawer.Screen
        name="ToDoList"
        component={() => <Screen name="To-Do List" />}
        options={{
          header: ({ navigation }) => (
            <StudentHeader onSidebarToggle={navigation.openDrawer} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={() => <Screen name="About" />}
        options={{
          header: ({ navigation }) => (
            <StudentHeader onSidebarToggle={navigation.openDrawer} />
          ),
        }}
      />
      <Drawer.Screen
        name="Chatbot"
        component={() => <Screen name="Chatbot" />}
        options={{
          header: ({ navigation }) => (
            <StudentHeader onSidebarToggle={navigation.openDrawer} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Student_Layout;

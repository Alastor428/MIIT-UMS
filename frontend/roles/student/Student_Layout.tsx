import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer"; 
import { Box, Text } from "native-base";
import Student_Sidebar from "./Student_Sidebar";
import StudentHeader from "./StudentHeader";
import Student_Timetable from "./Student_Timetable";

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

const Screen: React.FC = ({ navigation }: any) => {
  useEffect(() => {
    navigation.setOptions({
      title: "Dashboard", // Set the title when on Dashboard screen
    });
  }, [navigation]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="lg"> </Text>
    </Box>
  );
};

const Student_Layout: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <Student_Sidebar navigation={props.navigation as any} />
      )}
      screenOptions={{
        drawerStyle: { width: 300 },
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader onSidebarToggle={() => navigation.openDrawer()} title="Dashboard" />
          ),
        })}
      />
      <Drawer.Screen
        name="Timetable"
        component={Student_Timetable}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader onSidebarToggle={() => navigation.openDrawer()} title="Timetable" />
          ),
        })}
      />
      <Drawer.Screen
        name="Chat"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader onSidebarToggle={() => navigation.openDrawer()} title="Chat" />
          ),
        })}
      />
      <Drawer.Screen
        name="Events"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader onSidebarToggle={() => navigation.openDrawer()} title="Events" />
          ),
        })}
      />
      <Drawer.Screen
        name="ToDoList"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader onSidebarToggle={() => navigation.openDrawer()} title="To-Do-Lists" />
          ),
        })}
      />
      <Drawer.Screen
        name="About"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader onSidebarToggle={() => navigation.openDrawer()} title="About" />
          ),
        })}
      />
      <Drawer.Screen
        name="Chatbot"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader onSidebarToggle={() => navigation.openDrawer()} title="Chatbot" />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default Student_Layout;

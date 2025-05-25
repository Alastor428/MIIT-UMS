import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Box, Text } from "native-base";
import Teacher_Dashboard from "./Teacher_Dashboard";
import Teacher_Sidebar from "./Teacher_Sidebar";
import TeacherHeader from "./TeacherHeader";
import Teacher_Timetable from "./Teacher_Timetable";
import Teacher_ToDoList from "./Teacher_ToDoList";
import Teacher_Event from "./Teacher_Event";

const Drawer = createDrawerNavigator();

const Screen: React.FC = ({ navigation }: any) => {
  useEffect(() => {
    navigation.setOptions({
      title: "Dashboard",
    });
  }, [navigation]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="lg">Screen Content</Text>
    </Box>
  );
};

interface TeacherLayoutProps {
  onLogout: () => void;
}

const Teacher_Layout: React.FC<TeacherLayoutProps> = ({ onLogout }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <Teacher_Sidebar
          navigation={props.navigation as any}
          onLogout={onLogout}
        />
      )}
      screenOptions={{
        drawerStyle: { width: 300 },
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Teacher_Dashboard}
        options={({ navigation }) => ({
          header: () => (
            <TeacherHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="Dashboard"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Timetable"
        component={Teacher_Timetable}
        options={({ navigation }) => ({
          header: () => (
            <TeacherHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="Timetable"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Chat"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <TeacherHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="Chat"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Events"
        component={Teacher_Event}
        options={({ navigation }) => ({
          header: () => (
            <TeacherHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="Events"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="ToDoList"
        component={Teacher_ToDoList}
        options={({ navigation }) => ({
          header: () => (
            <TeacherHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="To-Do-Lists"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="About"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <TeacherHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="About"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Chatbot"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <TeacherHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="Chatbot"
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default Teacher_Layout;

import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Box, Text } from "native-base";
import StudentManagement from "./StudentManagement";
import TeacherManagement from "./TeacherManagement";
import Event_Planner from "./Event_Planner";
import AdminManagement from "./AdminManagement";
import AdminSidebar from "./AdminSidebar"
import Admin_Header from "./Admin_Header";

const Drawer = createDrawerNavigator();

const Screen: React.FC = ({ navigation }: any) => {
  useEffect(() => {
    navigation.setOptions({
      title: "Admin",
    });
  }, [navigation]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="lg">Screen Content</Text>
    </Box>
  );
};

const Admin_Layout: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <AdminSidebar navigation={props.navigation as any} />
      )}
      screenOptions={{
        drawerStyle: { width: 300 },
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="Admin"
        component={AdminManagement}
        options={({ navigation }) => ({
          header: () => (
            <Admin_Header
              onSidebarToggle={() => navigation.openDrawer()}
              title="Admin"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Teacher"
        component={TeacherManagement}
        options={({ navigation }) => ({
          header: () => (
            <Admin_Header
              onSidebarToggle={() => navigation.openDrawer()}
              title="Teacher"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Student"
        component={StudentManagement}
        options={({ navigation }) => ({
          header: () => (
            <Admin_Header
              onSidebarToggle={() => navigation.openDrawer()}
              title="Student"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Chat"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <Admin_Header
              onSidebarToggle={() => navigation.openDrawer()}
              title="Chat"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Events"
        component={Event_Planner}
        options={({ navigation }) => ({
          header: () => (
            <Admin_Header
              onSidebarToggle={() => navigation.openDrawer()}
              title="Events"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="ToDoList"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <Admin_Header
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
            <Admin_Header
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
            <Admin_Header
              onSidebarToggle={() => navigation.openDrawer()}
              title="Chatbot"
            />
          ),
        })}
      />
       
    </Drawer.Navigator>
  );
};

export default Admin_Layout;

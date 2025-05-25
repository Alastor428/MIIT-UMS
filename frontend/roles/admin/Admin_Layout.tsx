import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Box, Text } from "native-base";
import StudentManagement from "./StudentManagement";
import TeacherManagement from "./TeacherManagement";
import Event_Planner from "./Event_Planner";
import AdminManagement from "./AdminManagement";
import AdminSidebar from "./AdminSidebar";
import Admin_Header from "./Admin_Header";
import { get_admin } from "@/api/admin/get-admin.api";
import TimeTableManagement from "./TimeTableManagement";

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

interface Admin_Layout_Proprs {
  token: string;
}

const Admin_Layout: React.FC<Admin_Layout_Proprs> = ({ token }) => {
  const [adminData, setAdminData] = useState([]);
  const fetchAdminData = async () => {
    if (!token) return;
    const adminData = await get_admin(token);
    setAdminData(adminData.admin);
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);
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
        name="TimeTable"
        component={TimeTableManagement}
        options={({ navigation }) => ({
          header: () => (
            <Admin_Header
              onSidebarToggle={() => navigation.openDrawer()}
              title="Time Table"
            />
          ),
        })}
      />

      <Drawer.Screen
        name="Events"
        options={({ navigation }) => ({
          header: () => (
            <Admin_Header
              onSidebarToggle={() => navigation.openDrawer()}
              title="Events"
            />
          ),
        })}
      >
        {(props) => <Event_Planner {...props} token={token} />}
      </Drawer.Screen>

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

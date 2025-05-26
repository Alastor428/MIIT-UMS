import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Box, Text } from "native-base";
import Student_Dashboard from "./Student_Dashboard";
import Student_Sidebar from "./Student_Sidebar";
import StudentHeader from "./StudentHeader";
import Student_Timetable from "./Student_Timetable";
import Student_ToDoList from "./Student_ToDoList";
import Student_Event from "./Student_Event";
import { get_student } from "@/api/student/get-student.api";
import ChatBot from "./Chatbot";

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

interface Student_Layout_Props {
  token: string;
  onLogout: () => void;
}

const Student_Layout: React.FC<Student_Layout_Props> = ({
  token,
  onLogout,
}) => {
  const [studentData, setStudentData] = useState<Record<string, any>>({});
  const fetchStudentData = async () => {
    if (!token) return;
    const studentData = await get_student(token);
    setStudentData(studentData.student);
  };

  useEffect(() => {
    fetchStudentData();
  }, [token]);
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <Student_Sidebar
          navigation={props.navigation as any}
          studentData={studentData}
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
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="Dashboard"
            />
          ),
        })}
      >
        {(props) => (
          <Student_Dashboard
            {...props}
            token={token}
            studentID={studentData._id}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Timetable"
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="Timetable"
            />
          ),
        })}
      >
        {(props) => (
          <Student_Timetable
            {...props}
            token={token}
            studentId={studentData._id}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Chat"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="Chat"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Events"
        component={Student_Event}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="Events"
            />
          ),
        })}
      />
      <Drawer.Screen
        name="ToDoList"
        component={Student_ToDoList}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="To-Do-Lists"
            />
          ),
        })}
      />
      {/* <Drawer.Screen
        name="About"
        component={Screen}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="About"
            />
          ),
        })}
      /> */}
      <Drawer.Screen
        name="Chatbot"
        component={ChatBot}
        options={({ navigation }) => ({
          header: () => (
            <StudentHeader
              onSidebarToggle={() => navigation.openDrawer()}
              title="Chatbot"
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default Student_Layout;

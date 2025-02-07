import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import Student_Login from "@/roles/student/Student_Login";
import Student_Layout from "@/roles/student/Student_Layout";  

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>      
        <Stack.Navigator initialRouteName="Login">         
          <Stack.Screen
            name="Login"
            component={Student_Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StudentLayout"
            component={Student_Layout}
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>      
    </NativeBaseProvider>
  );
}

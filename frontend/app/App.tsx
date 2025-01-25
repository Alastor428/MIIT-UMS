import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import Student_Layout from "@/roles/student/Student_Layout"; // Ensure the correct path

export default function App() {
  return (
    <NativeBaseProvider>
      
        <Student_Layout />  {/* This will now be inside NavigationContainer */}
     
    </NativeBaseProvider>
  );
}

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
//import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import Student_Login from "@/roles/student/Student_Login";
import Student_Layout from "@/roles/student/Student_Layout"; // Ensure the correct path

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NativeBaseProvider>
      {/* Conditionally render based on authentication */}
      {isAuthenticated ? (
        <Student_Layout />
      ) : (
        <Student_Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </NativeBaseProvider>
  );
}

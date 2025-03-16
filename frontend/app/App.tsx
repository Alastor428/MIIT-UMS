import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import Login from "@/roles/student/Login"; // Import the Login component
import Student_Layout from "@/roles/student/Student_Layout"; // Import Student layout
import Admin_Layout from "@/roles/admin/Admin_Layout"; // Import Admin layout
import Teacher_Layout from "@/roles/teacher/Teacher_Layout"; // Import Teacher layout

const App = () => {
  const [role, setRole] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Handle login, setting the role based on successful login
  const handleLogin = (role: string, accessToken: string) => {
    setAccessToken(accessToken);
    setRole(role);
  };

  return (
    <NativeBaseProvider>
      {/* Conditionally render based on the role */}
      {role === "admin" ? (
        <Admin_Layout />
      ) : role === "teacher" ? (
        <Teacher_Layout />
      ) : role === "student" && accessToken ? (
        <Student_Layout token={accessToken} />
      ) : (
        // Show the login page if no role is set
        <Login onLogin={handleLogin} />
      )}
    </NativeBaseProvider>
  );
};

export default App;

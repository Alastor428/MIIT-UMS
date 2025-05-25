import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import Login from "@/roles/student/Login";
import Student_Layout from "@/roles/student/Student_Layout";
import Admin_Layout from "@/roles/admin/Admin_Layout";
import Teacher_Layout from "@/roles/teacher/Teacher_Layout";
import Guest from "@/roles/student/Guest";

const App = () => {
  const [role, setRole] = useState<string | null>(null);

  const handleLogin = (selectedRole: string) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
  };

  return (
    <NativeBaseProvider>
      {role === "admin" ? (
        <Admin_Layout onLogout={handleLogout} />
      ) : role === "teacher" ? (
        <Teacher_Layout onLogout={handleLogout} />
      ) : role === "student" ? (
        <Student_Layout onLogout={handleLogout} />
      ) : role === "guest" ? (
        <Guest onBack={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </NativeBaseProvider>
  );
};

export default App;

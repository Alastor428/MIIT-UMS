import React from 'react';
import { NativeBaseProvider } from 'native-base';
import Student_Layout from '@/roles/student/Student_Layout';

export default function App() {
  return (
    <NativeBaseProvider>
      <Student_Layout />
    </NativeBaseProvider>
  );
}

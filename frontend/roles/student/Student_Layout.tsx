import React, { useState } from 'react';
import { Box } from 'native-base';
import StudentHeader from './StudentHeader';

const Student_Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box flex={1}>
      {/* Header */}
      <StudentHeader onSidebarToggle={toggleSidebar} />
    </Box>
  );
};

export default Student_Layout;

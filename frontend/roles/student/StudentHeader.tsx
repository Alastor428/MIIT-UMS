import React, { useState } from "react";
import { Box, HStack, IconButton, Text, Badge } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface StudentHeaderProps {
  onSidebarToggle: () => void;
}

const StudentHeader: React.FC<StudentHeaderProps> = ({ onSidebarToggle }) => {
  const [notificationCount, setNotificationCount] = useState(3); // Example notification count

  return (
    <Box bg="gray.500" px={4} py={3}>
      <HStack justifyContent="space-between" alignItems="center">
        {/* Sidebar Toggle Icon */}
        <IconButton
          icon={<Ionicons name="menu" size={24} color="white" />}
          onPress={onSidebarToggle}
          _pressed={{ bg: "primary.600" }}
        />

        {/* Content Title */}
        <Text color="white" fontSize="lg" fontWeight="bold">
          Dashboard
        </Text>

        {/* Notification Icon */}
        <Box position="relative">
          <IconButton
            icon={
              <MaterialIcons name="notifications" size={24} color="white" />
            }
            onPress={() => console.log("Notification pressed")}
            _pressed={{ bg: "primary.600" }}
          />
          {notificationCount > 0 && (
            <Badge
              bg="red.600"
              rounded="full"
              position="absolute"
              top={-2}
              right={-2}
              zIndex={1}
              px={2}
              py={0}
              fontSize="xs"
              color="white"
            >
              {notificationCount}
            </Badge>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default StudentHeader;

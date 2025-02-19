import React from "react";
import { Box, HStack, IconButton, Text, Badge } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface StudentHeaderProps {
  onSidebarToggle: () => void;
  title: string; // Add a title prop
}

const StudentHeader: React.FC<StudentHeaderProps> = ({
  onSidebarToggle,
  title,
}) => {
  return (
    <Box bg="#E5E5E5" px={4} py={3}>
      <HStack justifyContent="space-between" alignItems="center">
        {/* Sidebar Toggle Icon */}
        <IconButton
          icon={<Ionicons name="menu" size={24} color="black" />}
          onPress={onSidebarToggle}
          _pressed={{ bg: "primary.600" }}
        />

        {/* Content Title */}
        <Text color="black" fontSize="xl" fontWeight="bold">
          {title} {/* Render the title here */}
        </Text>

        {/* Notification Icon */}
        <Box position="relative">
          <IconButton
            icon={
              <MaterialIcons name="notifications" size={24} color="black" />
            }
            onPress={() => console.log("Notification pressed")}
            _pressed={{ bg: "primary.600" }}
          />
          {3 > 0 && (
            <Badge
              bg="#ED5C7E"
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
              3
            </Badge>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default StudentHeader;

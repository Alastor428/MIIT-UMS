import React from "react";
import { Box, HStack, IconButton, Text, Badge } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface StudentHeaderProps {
  onSidebarToggle: () => void;
  title: string; // Add a title prop
}

const StudentHeader: React.FC<StudentHeaderProps> = ({ onSidebarToggle, title }) => {
  return (
    <Box bg="gray.500" px={4} py={3}>
      <HStack justifyContent="space-between" alignItems="center">        
        <IconButton
          icon={<Ionicons name="menu" size={24} color="white" />}
          onPress={onSidebarToggle}
          _pressed={{ bg: "primary.600" }}
        />        
        <Text color="white" fontSize="lg" fontWeight="bold">
          {title} 
        </Text>      
        <Box position="relative">
          <IconButton
            icon={<MaterialIcons name="notifications" size={24} color="white" />}
            onPress={() => console.log("Notification pressed")}
            _pressed={{ bg: "primary.600" }}
          />
          {3 > 0 && (
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
              3
            </Badge>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default StudentHeader;

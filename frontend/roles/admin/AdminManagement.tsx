import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Select,
  Input,
  Button,
  Text,
  Icon,
  FlatList,
  Pressable,
  Avatar,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AdminAccountCreateModal from "./AdminAccountCreateModal";
import AdminOptionsModal from "./AdminOptionsModal";
const AdminManagement = () => {
  const [level, setLevel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Daw Win Aye",
      level: "High Level Admin",
      email: "winaye@email.com",
    },
    {
      id: 2,
      name: "U Min Thu",
      level: "Low Level Admin",
      email: "minthu@example.com",
    },
    // Add more students as needed
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<{
    id: number;
    name: string;
    level: string;
    email: string;
  } | null>(null);

  const addAdmin = (admin: { name: string; level: string; email: string }) => {
    setAdmins([...admins, { id: admins.length + 1, ...admin }]);
  };

  const deleteAdmin = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  const updateAdmin = (updatedAdmin: {
    id: number;
    name: string;
    level: string;
    email: string;
  }) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === updatedAdmin.id ? updatedAdmin : admin
      )
    );
  };

  const filteredStudents = admins.filter(
    (admin) =>
      (!level || admin.level?.trim() === level.trim()) && 
      admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box safeArea p="4">
      {/* Filters */}
      <HStack space="2" mb="4">
        <Select
          selectedValue={level}
          minWidth="100px"
          placeholder="Batch"
          onValueChange={(value) => setLevel(value)}
        >
          <Select.Item label="All Levels" value="" />
          <Select.Item label="High Level Admin" value="High Level Admin" />
          <Select.Item label="Low Level Admin" value="Low Level Admin" />
        </Select>

        <Input
          flex="1"
          placeholder="Search..."
          onChangeText={(text) => setSearchTerm(text)}
          InputLeftElement={
            <Icon as={Ionicons} name="search-outline" size="sm" ml="2" />
          }
        />
      </HStack>

      {/* Admin List */}
      <Box bg="gray.100" p="4" borderRadius="md">
        <HStack justifyContent="space-between" alignItems="center" mb="2">
          <Text fontSize="md" fontWeight="bold">
            Admin List
          </Text>
          <Button
            size="sm"
            colorScheme="primary"
            onPress={() => setModalVisible(true)}
          >
            Add Admin
          </Button>
        </HStack>

        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HStack
              justifyContent="space-between"
              alignItems="center"
              py="2"
              borderBottomWidth="1"
              borderColor="gray.300"
            >
              <HStack alignItems="center">
                <Avatar size="sm" bg="gray.500">
                  <Icon as={Ionicons} name="person-outline" color="white" />
                </Avatar>
                <VStack ml="3">
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {item.level}
                  </Text>
                </VStack>
              </HStack>
              <Pressable
                onPress={() => {
                  setSelectedAdmin({
                    id: item.id,
                    name: item.name,
                    level: item.level || "", // If level is undefined, default to an empty string
                    email: item.email,
                  });
                  setOptionsModalVisible(true);
                }}
              >
                <Icon as={Ionicons} name="ellipsis-vertical" size="md" />
              </Pressable>
            </HStack>
          )}
        />
      </Box>

      {/* Admin Creation Modal */}
      <AdminAccountCreateModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={addAdmin}
      />

      {/* Student Options Modal */}
      <AdminOptionsModal
        isOpen={optionsModalVisible}
        onClose={() => setOptionsModalVisible(false)}
        admin={selectedAdmin}
        onDelete={deleteAdmin}
        onUpdate={updateAdmin}
      />
    </Box>
  );
};

export default AdminManagement;

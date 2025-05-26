import React, { useEffect, useState } from "react";
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
import { get_admins } from "@/api/admin/get-admin.api";
import { delete_admin } from "@/api/admin/delete-admin.api";

export type Admin = {
  _id: string;
  name: string;
  adminRole: string;
  email: string;
};

interface AdminManagementProps {
  token: string;
}

const AdminManagement: React.FC<AdminManagementProps> = ({ token }) => {
  const [level, setLevel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [refresh, setRefresh] = useState(false);

  // Function to manually trigger refresh
  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await get_admins();
      console.log(response);
      const formattedAdmins = response.admins.map((admin: any) => ({
        _id: admin._id,
        name: admin.user.name,
        email: admin.user.email,
        adminRole: admin.adminRole,
      }));

      setAdmins(formattedAdmins);
    };
    fetchData();
  }, [refresh]);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<{
    id: string;
    name: string;
    adminRole: string;
    email: string;
  } | null>(null);
  console.log(selectedAdmin);

  const filteredAdmins = admins.filter(
    (admin) =>
      (!level || admin.adminRole === level) &&
      admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteAdmin = async (id: string) => {
    try {
      console.log(id);
      const response = await delete_admin(id);
      console.log(response);
    } catch (e) {
      console.log("Error Deleting an Admin: ", e);
    }
  };

  const updateAdmin = (updatedAdmin: {
    id: number;
    name: string;
    level: string;
    email: string;
  }) => {
    // setAdmins(
    //   // admins.map((admin) =>
    //   //   admin.id === updatedAdmin.id ? updatedAdmin : admin
    //   // )
    // );
  };

  // const filteredStudents = admins.filter(
  //   (admin) =>
  //     (!level || admin.level?.trim() === level.trim()) &&
  //     admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredStudents: any = [];

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
          <Select.Item label="Super Admin" value="Super Admin" />
          <Select.Item label="Standard Admin" value="Standard Admin" />
        </Select>

        <Input
          flex="1"
          placeholder="Search..."
          onChangeText={(text) => setSearchTerm(text)}
          InputLeftElement={
            <Icon as={Ionicons} name="search-outline" size="sm" ml="2" />
          }
        />
        <Button onPress={triggerRefresh}>Refresh</Button>
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

        <FlatList<Admin>
          data={filteredAdmins}
          keyExtractor={(item) => item._id}
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
                    {item.adminRole}
                  </Text>
                </VStack>
              </HStack>
              <Pressable
                onPress={() => {
                  setSelectedAdmin({
                    id: item._id,
                    name: item.name,
                    adminRole: item.adminRole,
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
      />

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

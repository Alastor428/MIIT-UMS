import React, { useState } from "react";
import {
  Box,
  Button,
  Fab,
  Icon,
  ScrollView,
  Text,
  VStack,
  HStack,
  Pressable, // Import Pressable from NativeBase
} from "native-base";
import { Task } from "./types";
import AddTaskModal from "./AddTaskModal";
import { Ionicons } from "@expo/vector-icons";
import EditTaskModal from "./EditTaskModal";

const Student_ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const handleEditTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSelectedTask(null);
    setEditModalVisible(false);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  // Group tasks by due date
  const tasksGroupedByDate = tasks.reduce(
    (acc: Record<string, Task[]>, task) => {
      const dateKey = task.dueDate;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(task);
      return acc;
    },
    {}
  );

  return (
    <Box flex={1} bg="white" p={4} position="relative">
      {" "}
      {/* Set position to relative here */}
      {/* Task List Header */}
      {Object.keys(tasksGroupedByDate).length === 0 ? (
        <Text textAlign="center" mt={4}>
          No tasks available. Press the "+" button to add a task.
        </Text>
      ) : (
        <ScrollView>
          <VStack space={6}>
            {Object.entries(tasksGroupedByDate).map(
              ([dueDate, tasksForDate]) => (
                <Box key={dueDate}>
                  <Text bold fontSize="lg" mb={2}>
                    Due Date: {dueDate}
                  </Text>
                  <VStack space={4}>
                    {tasksForDate.map((task, index) => (
                      <Pressable
                        key={index}
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        borderColor="gray.200"
                        bg={task.color || "gray.50"}
                        onPress={() => openEditModal(task)} // Now Pressable supports onPress
                      >
                        <Text bold>{task.title}</Text>
                        <Text>{task.details}</Text>
                      </Pressable>
                    ))}
                  </VStack>
                </Box>
              )
            )}
          </VStack>
        </ScrollView>
      )}
      {/* Add Task Modal */}
      <AddTaskModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={handleAddTask}
      />
      {/* Edit Task Modal */}
      <EditTaskModal
        isVisible={editModalVisible}
        task={selectedTask!} // Ensure the task is not null
        onClose={() => setEditModalVisible(false)}
        onEditTask={handleEditTask}
      />
      {/* Add Task Button */}
      <Fab
        position="absolute"
        size="sm"
        icon={<Icon as={Ionicons} name="add" />}
        onPress={() => setModalVisible(true)}
        bottom={4} // Adjust position from the bottom if needed
        right={4} // Adjust position from the right if needed
      />
    </Box>
  );
};

export default Student_ToDoList;

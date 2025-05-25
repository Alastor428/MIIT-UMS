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
  Pressable,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "./types";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModal";

const Teacher_ToDoList: React.FC = () => {
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

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
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
                    {tasksForDate.map((task) => (
                      <Box
                        key={task.id}
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        borderColor="gray.200"
                        bg={task.color || "gray.50"}
                      >
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Pressable
                            onPress={() => openEditModal(task)}
                            flex={1}
                          >
                            <VStack>
                              <Text bold>{task.title}</Text>
                              <Text>{task.details}</Text>
                            </VStack>
                          </Pressable>
                          <Button
                            size="sm"
                            colorScheme="danger"
                            onPress={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </Button>
                        </HStack>
                      </Box>
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
      {selectedTask && (
        <EditTaskModal
          isVisible={editModalVisible}
          task={selectedTask}
          onClose={() => setEditModalVisible(false)}
          onEditTask={handleEditTask}
        />
      )}

      {/* FAB for Adding Tasks */}
      <Fab
        position="absolute"
        size="sm"
        icon={<Icon as={Ionicons} name="add" />}
        onPress={() => setModalVisible(true)}
        bottom={4}
        right={4}
      />
    </Box>
  );
};

export default Teacher_ToDoList;

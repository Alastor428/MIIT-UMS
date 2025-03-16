import React, { useState } from "react";
import { Modal, Button, VStack } from "native-base";
import { Course } from "./Teacher_Timetable";
import CourseDetailsModal from "./CourseDetailModal";
import EditCourseModal from "../student/modals/EditCourseModal";

interface OptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onViewMore: () => void;
  onEdit: () => void;
  onDelete: () => void;
}
const OptionsModal = ({
  isOpen,
  onClose,
  course,
  onViewMore,
  onEdit,
  onDelete,
}: OptionsModalProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleViewMore = () => {
    if (course) {
      console.log("Opening course details modal");
      setIsDetailsModalOpen(true);
      onViewMore();
    }
  };

  const handleEdit = () => {
    if (course) {
      console.log("Opening edit course modal");
      setIsEditModalOpen(true);
    } else {
      console.log("No course to edit");
    }
  };

  const handleEditCourse = (updatedCourse: Course) => {
    console.log("Updated Course: ", updatedCourse);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Options</Modal.Header>
          <Modal.Body>
            <VStack space={2}>
              <Button onPress={handleViewMore} isDisabled={!course}>
                View More
              </Button>
              <Button onPress={handleEdit} isDisabled={!course}>
                Edit
              </Button>
              <Button onPress={onDelete} colorScheme="danger">
                Delete
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <CourseDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        course={course}
      />
      {course && (
        <EditCourseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          course={course}
          handleEditCourse={handleEditCourse}
        />
      )}
    </>
  );
};

export default OptionsModal;

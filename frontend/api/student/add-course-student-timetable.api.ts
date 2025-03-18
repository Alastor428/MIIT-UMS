import axios from "axios";

export const add_course_student_timetable = async (courseData: Record<string, any>, studentId: string) => {
    try {
        const response = await axios.post(`http://192.168.137.1:3000/api/student/${studentId}/timetable`, courseData);
        return response.data;
    } catch (error: any) {
        console.error("Error adding course to timetable:", error);
        throw new Error(error.message); // Proper error handling

    }
}
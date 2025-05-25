import axios from "axios";

export const add_course_teacher_timetable = async (courseData: Record<string, any>, token: string) => {
    try {
        const response = await axios.post(`http://192.168.137.1:3000/api/teacher/timetable`, {
            data: courseData, headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error adding course to timetable:", error);
        throw new Error(error.message); // Proper error handling

    }
}
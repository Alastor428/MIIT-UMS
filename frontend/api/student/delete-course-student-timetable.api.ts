import axios from "axios";


export const delete_course_student_timetable = async (courseId: string, token: string) => {
    try {
        const response = await axios.delete(`http://192.168.137.1:3000/api/student/timetable/course/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error: any) {
        throw new error;
    }
}
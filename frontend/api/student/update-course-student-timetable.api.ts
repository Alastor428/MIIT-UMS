import axios from "axios";


export const update_course_student_timetable = async (courseData: Record<string, any>, token: string) => {
    try {
        console.log(courseData)
        const response = await axios.put(`http://192.168.137.1:3000/api/student/update-course`, courseData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error: any) {
        throw error;
    }
}
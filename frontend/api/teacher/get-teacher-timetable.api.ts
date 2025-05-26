import axios from "axios";

export const get_teacher_timetable = async (token: string) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/teacher/timetable`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        return response.data
    } catch (error: any) {
        throw new error;
    }
}
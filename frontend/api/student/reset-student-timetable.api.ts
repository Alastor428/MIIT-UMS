import axios from "axios";


export const reset_student_timetable = async (token: string) => {
    try {
        const response = await axios.patch(`http://192.168.137.1:3000/api/student/timetable/reset`, {
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
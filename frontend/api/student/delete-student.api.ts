import axios from "axios";

export const delete_student = async (studentId: string) => {
    try {
        const response = await axios.delete(`http://192.168.137.1:3000/api/student/delete/${studentId}`)
        return response.data;
    } catch (error: any) {
        throw new error;
    }
}
import axios from "axios";

export const delete_teacher = async (ID: string) => {
    try {
        const response = await axios.delete(`http://192.168.137.1:3000/api/teacher/delete/${ID}`)
        return response.data;
    } catch (error: any) {
        throw new error;
    }
}
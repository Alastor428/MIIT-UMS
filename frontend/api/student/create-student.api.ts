import axios from "axios";

export const create_student = async (data: Record<string, any>) => {
    try {
        const response = await axios.post(`http://192.168.137.1:3000/api/auth/register`, data);
        return response.data
    } catch (error: any) {
        throw new error;
    }
}
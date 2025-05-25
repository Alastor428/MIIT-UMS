import axios from "axios";

export const create_teacher = async (data: Record<string, any>) => {
    console.log("data: ", data)
    try {
        const response = await axios.post(`http://192.168.137.1:3000/api/auth/register`, data);
        return response.data
    } catch (error: any) {
        throw new error;
    }
}
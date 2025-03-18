import axios from "axios";

export const update_event = async (data: Record<string, any>, title: string) => {
    try {
        const response = await axios.patch(`http://192.168.137.1:3000/api/event/update/${title}`, data)
        return response.data;
    } catch (error: any) {
        throw error
    }
}
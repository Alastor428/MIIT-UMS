import axios from "axios";

export const delete_event = async (title: string) => {
    try {
        const response = await axios.delete(`http://192.168.137.1:3000/api/event/update/${title}`)
        return response.data;
    } catch (error: any) {
        throw error
    }
}
import axios from "axios";

export const get_event = async (title: string, token: string) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/event/${title}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        return response.data;
    } catch (error: any) {
        throw error
    }
}

// Get Event By Priority

export const get_events_by_priority = async (priority: string) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/event/${priority}`)
        return response.data;
    } catch (error: any) {
        throw error
    }
}

export const get_all_events = async () => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/event/all`)
        return response.data;
    } catch (error: any) {
        throw error;
    }

}
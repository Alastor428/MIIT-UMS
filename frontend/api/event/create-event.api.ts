import axios from "axios";

export const create_event = async (data: Record<string, any>) => {
    try {
        console.log("Sending event data:", data);

        const response = await axios.post(
            `http://192.168.137.1:3000/api/event/create`,
            data,
            { headers: { "Content-Type": "application/json" } }  // Explicitly set JSON content type
        );

        console.log("Response received:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Error response:", error.response?.data || error.message);
        throw error;
    }
};

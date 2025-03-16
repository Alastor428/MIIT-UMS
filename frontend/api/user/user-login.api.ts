import axios from "axios";

// Function to handle user login
export const user_login = async <T>(logindata: Record<string, any>): Promise<T | null> => {
    try {
        // const response = await axios.post<T>(`${API_BASE_URL}/api/auth/login`, logindata);
        const response = await axios.post<T>(`http://192.168.137.1:3000/api/auth/login`, logindata);
        console.log("Login successful");
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("Login failed:", error.response.data.message);
            alert(error.response.data.message);
        } else if (error.request) {
            console.error("No response received:", error.request);
            alert("No response from server. Please check your connection.");
        } else {
            console.error("Error setting up request:", error.message);
            alert("An error occurred while logging in.");
        }
        return null;
    }
};
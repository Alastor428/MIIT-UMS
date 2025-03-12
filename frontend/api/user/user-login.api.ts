import axios from "axios";

// Function to handle user login
export const user_login = async <T>(logindata: Record<string, any>): Promise<T | null> => {
    try {
        // const response = await axios.post<T>(`${API_BASE_URL}/api/auth/login`, logindata);
        const response = await axios.post<T>(` http://192.168.137.1:3000/api/auth/login`, logindata);
        console.log("Login successful");
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
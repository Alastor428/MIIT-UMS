import axios from "axios";

export const update_teacher = async (teacherData: Record<string, any>, token: string) => {
    try {
        console.log("Updating teacher:", teacherData);

        const response = await axios.put(
            `http://192.168.137.1:3000/api/teacher/${teacherData.id}`,
            teacherData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Failed to update teacher:", error?.response?.data || error.message);
        throw error;
    }
};

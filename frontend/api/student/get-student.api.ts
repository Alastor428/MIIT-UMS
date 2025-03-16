import axios from "axios";

export const get_student = async (token: string) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/student/get-student`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        return response.data;
    } catch (error: any) {
        return null
    }
}

export const get_student_by_email = async (email: Record<string, any>) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/student/email`, email);
        return response.data;
    } catch (error: any) {
        throw new error;
    }
}

export const get_students_by_batch = async (batch: string) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/student/get-student/${batch}`);
        return response.data
    } catch (error: any) {
        throw new error;
    }
}

export const get_all_students = async () => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/student/all`);
        return response.data;
    } catch (error: any) {
        throw new error;
    }
}
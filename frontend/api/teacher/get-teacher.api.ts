import axios from "axios";


export const get_teacher = async (token: string) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/teacher/get-teacher`, {
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

export const get_teacher_by_email = async (email: string) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/teacher/get-teacher/${email}`);
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export const get_teachers_by_dept = async (dept: string) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/teacher/get-teacher/${dept}`);
        return response.data
    } catch (error: any) {
        throw new error;
    }
}

export const get_all_teacher = async () => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/teacher/all`);
        return response.data;
    } catch (error: any) {
        throw new error;
    }
}
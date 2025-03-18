import axios from "axios";

export const get_admin = async (token: string) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/admin/get-admin`, {

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

// Get admins 


export const get_admins = async () => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/admin/all`)
        return response.data;
    } catch (error: any) {
        throw error
    }
}


// Get admins by Role

export const get_admins_by_adminRole = async (adminRole: string, token: string) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/admin/getAdmin/${adminRole}`, {

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


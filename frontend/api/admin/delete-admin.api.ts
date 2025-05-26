import axios from "axios";

export const delete_admin = async (adminId: string) => {
    console.log(adminId)
    try {
        const response = await axios.delete(`http://192.168.137.1:3000/api/admin/delete/${adminId}`)
        return response.data;
    } catch (error: any) {
        throw error
    }
}
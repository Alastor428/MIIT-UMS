import axios from "axios";

export const get_batch_timetable = async (batch: string) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/batch-timetable/${batch}`)
        return response.data;
    } catch (error: any) {
        return null
    }
}

export const get_all_batch_timetables = async () => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/api/batch-timetable/all`)
        return response.data;
    } catch (error: any) {
        return null
    }
}
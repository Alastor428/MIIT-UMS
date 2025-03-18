import axios from 'axios';

export const uploadTimetable = async (file: File, createdBy: string) => {
    try {
        const formData = new FormData();
        formData.append('timetable_data', file);

        const response = await axios.post(
            `http://192.168.137.1:3000/api/batch-timetable/upload?createdBy=${createdBy}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error('Error uploading file:', error.response?.data || error.message);
        throw error;
    }
};

export default uploadTimetable;

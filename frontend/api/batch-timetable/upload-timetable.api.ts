import axios from 'axios';

export const uploadTimetable = async (formData: FormData, createdBy: string) => {
    try {
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

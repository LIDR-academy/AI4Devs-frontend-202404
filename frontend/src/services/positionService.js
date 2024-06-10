import axios from 'axios';

const API_BASE_URL = 'http://localhost:3010';

export const getInterviewFlow = async (positionId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/position/${positionId}/interviewFlow`);
        return response.data.interviewFlow;
    } catch (error) {
        console.error('Error fetching interview flow:', error);
        throw error;
    }
};

export const getCandidates = async (positionId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/position/${positionId}/candidates`);
        return response.data;
    } catch (error) {
        console.error('Error fetching candidates:', error);
        throw error;
    }
};

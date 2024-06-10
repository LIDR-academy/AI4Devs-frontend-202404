import axios from 'axios';

const API_BASE_URL = 'http://localhost:3010'; // Reemplaza con la URL base de tu API

export const getPositionCandidates = async (positionId: string) => {
    const response = await axios.get(`${API_BASE_URL}/position/${positionId}/candidates`);
    return response.data;
};

export const getPositionInterviewFlow = async (positionId: string) => {
    const response = await axios.get(`${API_BASE_URL}/position/${positionId}/interviewFlow`);
    return response.data;
};

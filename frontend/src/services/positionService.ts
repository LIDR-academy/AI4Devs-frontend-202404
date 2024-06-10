import axios from 'axios';

export const fetchInterviewFlow = async (positionId: string) => {
    try {
        const response = await axios.get(`http://localhost:3010/position/${positionId}/interviewFlow`);
        return response.data;
    } catch (error:any) {
        throw new Error('Error al obtener el flujo de entrevistas:', error.response.data);
    }
};

export const fetchCandidates = async (positionId: string) => {
    try {
        const response = await axios.get(`http://localhost:3010/position/${positionId}/candidates`);
        return response.data;
    } catch (error:any) {
        throw new Error('Error al obtener candidatos:', error.response.data);
    }
};

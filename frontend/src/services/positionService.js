import axios from 'axios';

export const getPositionInterviewFlow = async (positionId) => {
    try {
        const response = await axios.get(`http://localhost:3010/position/${positionId}/interviewFlow`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener el flujo de entrevista para la posición:', error.response.data);
    }
};

export const getPositionCandidates = async (positionId) => {
    try {
        const response = await axios.get(`http://localhost:3010/position/${positionId}/candidates`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los candidatos para la posición:', error.response.data);
    }
};

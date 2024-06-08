import axios from 'axios';

const BASE_URL = 'http://localhost:3010'; // Definir la URL base

// Función para obtener los detalles de una posición por ID
export const getPositionDetails = async (id) => {
    const response = await axios.get(`${BASE_URL}/position/${id}/interviewflow`);
    return response.data;
};

// Función para obtener los candidatos de una posición por ID de posición
export const getCandidatesByPosition = async (positionId) => {
    const response = await axios.get(`${BASE_URL}/position/${positionId}/candidates`);
    return response.data;
};

// Función para actualizar la fase de un candidato
export const updateCandidateStage = async (candidateId, applicationId, newStep) => {
    const response = await fetch(`${BASE_URL}/candidates/${candidateId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            applicationId,
            currentInterviewStep: newStep,
        }),
    });
    return response.json();
};
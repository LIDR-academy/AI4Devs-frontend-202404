import axios from 'axios';

export const uploadCV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('http://localhost:3010/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Devuelve la ruta del archivo y el tipo
    } catch (error) {
        throw new Error('Error al subir el archivo:', error.response.data);
    }
};

export const sendCandidateData = async (candidateData) => {
    try {
        const response = await axios.post('http://localhost:3010/candidates', candidateData);
        return response.data;
    } catch (error) {
        throw new Error('Error al enviar datos del candidato:', error.response.data);
    }
};

export const updateCandidateInterviewStep = async (candidateId, newInterviewStepId) => {
    try {
        const response = await axios.put(`http://localhost:3010/candidate/${candidateId}`, {
            applicationId: candidateId,
            currentInterviewStep: newInterviewStepId
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar la etapa del candidato:', error.response.data);
    }
};
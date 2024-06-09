import axios from 'axios';

// Set base url to axios
axios.defaults.baseURL = 'http://localhost:3010';

export const uploadCV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('/upload', formData, {
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
        const response = await axios.post('/candidates', candidateData);
        return response.data;
    } catch (error) {
        throw new Error('Error al enviar datos del candidato:', error.response.data);
    }
};

export const fetchCandidates = async (positionId) => {
    try {
        const response = await axios.get(`/position/${positionId}/candidates`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los candidatos:', error.response.data);
    }
};

export const updateCandidateStage = async (candidateId, stageData) => {
    try {
        const response = await axios.patch(`/candidates/${candidateId}/stage`, stageData);
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar la etapa del candidato:', error.response.data);
    }
};

axios.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.message || 'Error desconocido';
        throw new Error(message);
    }
);
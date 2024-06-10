import axios from 'axios';

export const getInterviewFlow = async (positionId) => {
    try {
        const response = await axios.get(`http://localhost:3010/position/${positionId}/interviewFlow`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener el flujo de entrevistas:', error.response.data);
    }
};

export const getCandidates = async (positionId) => {
    try {
        const response = await axios.get(`http://localhost:3010/position/${positionId}/candidates`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los candidatos:', error.response.data);
    }
};


export const updateCandidateStep = async (candidateId, positionId, newStep) => {
    try {
      const response = await axios.put(`http://localhost:3010/candidate/${candidateId}`, {
      candidateId: candidateId.toString(), 
      positionId: positionId.toString(), 
      currentInterviewStep: newStep.toString()
      });
      return response.data; // O manejar la respuesta como necesites
    } catch (error) {
      console.error('Error updating candidate step:', error);
      // Manejar errores aquí, como mostrar un mensaje al usuario
    }
  };

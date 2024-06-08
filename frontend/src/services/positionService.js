import axios from 'axios';

export const getPositionDetails = async (id) => {
    const response = await axios.get(`http://localhost:3010/position/${id}/interviewflow`);
    return response.data;
};

export const getCandidatesByPosition = async (positionId) => {
    const response = await axios.get(`http://localhost:3010/position/${positionId}/candidates`);
    return response.data;
};

export const updateCandidateStage = async (candidateId, applicationId, newStep) => {
    const response = await fetch(`http://localhost:3010/candidates/${candidateId}`, {
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
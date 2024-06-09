export const fetchPositionDetails = async (id) => {
  const res = await fetch(`http://localhost:3010/position/${id}/interviewFlow`);
  return res.json();
};

export const fetchCandidates = async (id) => {
  const res = await fetch(`http://localhost:3010/position/${id}/candidates`);
  return res.json();
};

export const updateCandidateStage = async (candidateId, applicationId, newStepId) => {
  await fetch(`http://localhost:3010/candidates/${candidateId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ applicationId, currentInterviewStep: newStepId }),
  });
};
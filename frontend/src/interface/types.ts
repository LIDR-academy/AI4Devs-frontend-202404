export interface Candidate {
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
  candidateId: number;
  applicationId: number;
}

export interface IInterviewFlow {
    positionName:  string;
    interviewFlow: InterviewFlowInterviewFlow;
}

export interface InterviewFlowInterviewFlow {
    id:             number;
    description:    string;
    interviewSteps: InterviewStep[];
}

export interface InterviewStep {
    id:              number;
    interviewFlowId: number;
    interviewTypeId: number;
    name:            string;
    orderIndex:      number;
}

export interface InterviewStep {
  id: number;
  name: string;
  orderIndex: number;
}

export interface InterviewFlow {
  positionName: string;
  interviewSteps: InterviewStep[];
}


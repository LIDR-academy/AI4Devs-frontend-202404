import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from 'axios';

interface InterviewStep {
    id: number;
    interviewFlowId: number;
    interviewTypeId: number;
    name: string;
    orderIndex: number;
}

interface InterviewFlow {
    id: number;
    description: string;
    interviewSteps: InterviewStep[];
}

interface InterviewFlowData {
    interviewFlow: {
        positionName: string;
        interviewFlow: InterviewFlow;
    };
}

interface Candidate {
    fullName: string;
    currentInterviewStep: string;
    averageScore: number;
}

const ProcessStatus = () => {
    const { id } = useParams<string>();
    const [interviewFlow, setInterviewFlow] = useState<InterviewFlow | null>(null);
    const [positionName, setPositionName] = useState<string>('');
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const interviewFlowResponse = await axios.get<InterviewFlowData>(`http://localhost:3010/position/${id}/interviewFlow`);
                setInterviewFlow(interviewFlowResponse.data.interviewFlow.interviewFlow);
                setPositionName(interviewFlowResponse.data.interviewFlow.positionName);

                const candidatesResponse = await axios.get<Candidate[]>(`http://localhost:3010/position/${id}/candidates`);
                setCandidates(candidatesResponse.data);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const getEmoji = (score: number) => {
        const emojis = ['🔴', '🟠', '🟡', '🔵', '🟢', '⭐'];
        return emojis[score];
    };

    return (
        <Container className="mt-5">
            <div className="min-h-screen flex flex-col items-center p-4">
                <h1 className="text-2xl font-bold mb-6">{positionName}</h1>
                {interviewFlow && interviewFlow.interviewSteps.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
                        {interviewFlow.interviewSteps.map(step => (
                            <div key={step.id} className="bg-white dark:bg-zinc-700 p-4 rounded-lg shadow-lg">
                                <h2 className="text-lg font-semibold mb-2">{step.name}</h2>
                                {candidates.filter(c => c.currentInterviewStep === step.name).map(candidate => (
                                    <div key={candidate.fullName} className="bg-zinc-100 dark:bg-zinc-600 p-2 rounded-lg mb-2">
                                        <p className="font-medium mb-0">
                                            <span className="w-5 h-5 mr-1">{getEmoji(candidate.averageScore)}</span> 
                                            {candidate.fullName}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Warning!</strong>
                        <span className="block sm:inline"> There are no steps or candidates related to this offer.</span>
                    </div>
                )}
                <a href="/positions" className="mt-4 text-blue-500 dark:text-blue-300 hover:underline">
                  Go back
                </a>
            </div>
        </Container>
    );
};

export default ProcessStatus;

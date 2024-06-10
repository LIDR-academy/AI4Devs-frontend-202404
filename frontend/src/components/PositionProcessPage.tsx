import React, { useEffect, useState } from 'react';
import KanbanBoard from './KanbanBoard';
import { InterviewStep, Candidate, IInterviewFlow } from '../interface/types';
import { fetchInterviewFlow, fetchCandidates } from '../services/positionService';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

interface PositionProcessPageProps {
    // No más props de match necesarios aquí
}

const PositionProcessPage: React.FC<PositionProcessPageProps> = () => {
    const [interviewStep, setInterviewStep] = useState<InterviewStep[]>([]);
    const [interviewFlow, setInterviewFlow] = useState<IInterviewFlow>();
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const loadData = async () => {
                const interviewSteps = await fetchInterviewFlow(id);
                const candidatesData = await fetchCandidates(id);
                setInterviewStep(interviewSteps.interviewFlow.interviewFlow.interviewSteps);
                setInterviewFlow(interviewSteps.interviewFlow);
                setCandidates(candidatesData);
                console.log(interviewSteps, candidatesData);
            };

            loadData();
        }
    }, [id]);

    const handleBack = () => {
        navigate('/positions');
    };

    return (
        <Container className="mt-5">
            <div className="d-flex align-items-center">
                <button onClick={handleBack} className='back'>
                    &#x2190; {/* Unicode para la flecha */}
                </button>
                <h3 style={{ margin: '0px' }}>{interviewFlow?.positionName}</h3>
            </div>
            <br />
            <KanbanBoard interviewStep={interviewStep} candidates={candidates} setCandidates={setCandidates} />
        </Container>
    );
};

export default PositionProcessPage;

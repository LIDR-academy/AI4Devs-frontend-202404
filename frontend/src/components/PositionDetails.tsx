import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getPositionCandidates, getPositionInterviewFlow } from '../services/positionService';
import KanbanColumn from './KanbanColumn';
import '../styles/PositionDetails.css';
import { useParams } from 'react-router-dom';

interface Candidate {
    id: number;
    fullName: string;
    applicationId: number;
    currentInterviewStep: string;
    averageScore: number;
}

interface InterviewStep {
    id: number;
    name: string;
    orderIndex: number;
}

const PositionDetails: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [interviewFlow, setInterviewFlow] = useState<InterviewStep[]>([]);
    const [positionName, setPositionName] = useState<string>('');
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState<string | null>(null);

    const updateCandidates = (updatedCandidate: Candidate) => {
        setCandidates(prevCandidates => prevCandidates.map(candidate =>
            candidate.id === updatedCandidate.id ? updatedCandidate : candidate
        ));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const candidatesData = await getPositionCandidates(id!);
                const interviewFlowData = await getPositionInterviewFlow(id!);
                console.log('candidatesData', candidatesData);
                console.log('interviewFlowData', interviewFlowData);
                setCandidates(candidatesData);
                setInterviewFlow(interviewFlowData.interviewFlow.interviewFlow.interviewSteps);
                setPositionName(interviewFlowData.interviewFlow.positionName);
            } catch (err) {
                setError('Error al cargar los datos');
                console.error(err);
            }
        };

        fetchData();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">{positionName}</h2>
            <Row>
                {interviewFlow.map((step) => (
                    <Col key={step.id} md={3}>
                        <KanbanColumn 
                            step={step} 
                            candidates={candidates.filter(candidate => candidate.currentInterviewStep === step.name)} 
                            updateCandidates={updateCandidates}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PositionDetails;

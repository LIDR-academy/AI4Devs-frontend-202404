import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { getInterviewFlow, getCandidates } from '../services/positionService';

interface InterviewStep {
    id: number;
    interviewFlowId: number;
    interviewTypeId: number;
    name: string;
    orderIndex: number;
}

interface InterviewFlow {
    positionName: string;
    interviewFlow: {
        id: number;
        description: string;
        interviewSteps: InterviewStep[];
    };
}

interface Candidate {
    fullName: string;
    currentInterviewStep: string;
    averageScore: number;
}

const PositionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [interviewFlow, setInterviewFlow] = useState<InterviewFlow | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [flowData, candidatesData] = await Promise.all([
                    getInterviewFlow(id),
                    getCandidates(id)
                ]);

                setInterviewFlow(flowData);
                setCandidates(candidatesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (!interviewFlow) {
        return <div>Posición no encontrada</div>;
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">{interviewFlow.positionName} Position</h2>
            <Row>
                {interviewFlow.interviewFlow.interviewSteps.map((step, index) => (
                    <Col key={index} md={3}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{step.name}</Card.Title>
                                {candidates
                                    .filter(candidate => candidate.currentInterviewStep === step.name)
                                    .map((candidate, idx) => (
                                        <Card key={idx} className="mb-2">
                                            <Card.Body>
                                                <Card.Text>
                                                    {candidate.fullName}
                                                    <div>
                                                        {Array(candidate.averageScore).fill(0).map((_, i) => (
                                                            <span key={i} role="img" aria-label="star">🟢</span>
                                                        ))}
                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PositionDetails;

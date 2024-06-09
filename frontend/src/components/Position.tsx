import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { getPositionCandidates, getPositionInterviewFlow } from '../services/positionService';
import { useParams, Link } from 'react-router-dom';
import { updateCandidateInterviewStep } from '../services/candidateService'; // Import the updateCandidateInterviewStep function

const PositionView: React.FC = () => {
    const [positionData, setPositionData] = useState<any>(null);
    const [candidates, setCandidates] = useState<any[]>([]);
    const [draggedCandidate, setDraggedCandidate] = useState<any>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPositionData = async () => {
            try {
                const data = await getPositionInterviewFlow(id);
                setPositionData(data.interviewFlow);
                const candidatesResponse = await getPositionCandidates(id);
                setCandidates(candidatesResponse);
            } catch (error) {
                console.error('Error fetching position data:', error);
            }
        };

        fetchPositionData();
    }, [id]);

    const handleDragStart = (candidate: any) => {
        setDraggedCandidate(candidate);
    };

    const handleDrop = async (stepName: string, stepId: number) => {
        if (draggedCandidate) {
            const updatedCandidates = candidates.map(async (candidate: any) => {
                if (candidate === draggedCandidate) {
                    await updateCandidateInterviewStep(candidate.candidateId, candidate.applicationId, stepId); // Call the updateCandidateInterviewStep function
                    return { ...candidate, currentInterviewStep: stepName };
                }
                return candidate;
            });
            setCandidates(await Promise.all(updatedCandidates));
        }
    };

    const renderCandidateCards = (candidates: any) => {
        return candidates.map((candidate: any, index: number) => (
            <Card
                key={index}
                className="shadow-sm"
                draggable
                onDragStart={() => handleDragStart(candidate)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(candidate.currentInterviewStep, 0)}
            >
                <Card.Body>
                    <Card.Title>{candidate.fullName}</Card.Title>
                    <Card.Text>
                        <strong>Average Score:</strong> {candidate.averageScore}
                    </Card.Text>
                </Card.Body>
            </Card>
        ));
    };

    return (
        <Container className="mt-5">
            <Link to="/positions">
                <Button variant="primary" className="mb-3">←</Button>
            </Link>
            <h2 className="text-center mb-4">Posición: {positionData?.positionName}</h2>
            <Row>
                {positionData?.interviewFlow?.interviewSteps.map((step: any, index: number) => (
                    <Col key={index} md={3} className="mb-4" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(step.name, step.id)}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h4 className="text-center">{step.name}</h4>
                                {renderCandidateCards(candidates.filter(candidate => candidate.currentInterviewStep === step.name))}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PositionView;

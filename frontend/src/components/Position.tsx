import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { getPositionCandidates, getPositionInterviewFlow } from '../services/positionService';
import { useParams } from 'react-router-dom';

const PositionView: React.FC = () => {
    const [positionData, setPositionData] = useState<any>(null);
    const [candidates, setCandidates] = useState<any[]>([]);
    const [draggedCandidate, setDraggedCandidate] = useState<any>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPositionData = async () => {
            try {
                const data = await getPositionInterviewFlow(id); // Assuming positionId is 1, you can adjust this as needed
                setPositionData(data.interviewFlow);
                const candidatesResponse = await getPositionCandidates(id); // Assuming positionId is 1, you can adjust this as needed
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

    const handleDrop = (stepName: string) => {
        if (draggedCandidate) {
            const updatedCandidates = candidates.map((candidate: any) => {
                if (candidate === draggedCandidate) {
                    return { ...candidate, currentInterviewStep: stepName };
                }
                return candidate;
            });
            setCandidates(updatedCandidates);
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
                onDrop={() => handleDrop(candidate.currentInterviewStep)}
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
            <h2 className="text-center mb-4">Posición: {positionData?.positionName}</h2>
            <Row>
                {positionData?.interviewFlow?.interviewSteps.map((step: any, index: number) => (
                    <Col key={index} md={3} className="mb-4" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(step.name)}>
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


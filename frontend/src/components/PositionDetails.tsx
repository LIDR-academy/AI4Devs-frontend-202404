import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { getInterviewFlow, getCandidates } from '../services/positionService';
import { updateCandidateStage } from '../services/candidateService';

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
    id: number;
    fullName: string;
    currentInterviewStep: string;
    averageScore: number;
    applicationId: number;
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

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination || !interviewFlow || !interviewFlow.interviewFlow.interviewSteps[destination.index]) {
            console.error('Invalid destination or interview flow step');
            return;
        }

        const candidateId = parseInt(draggableId);
        const candidate = candidates.find(c => c.id === candidateId);
        if (!candidate) {
            console.error('Candidate not found');
            return;
        }

        const newStepName = interviewFlow.interviewFlow.interviewSteps[destination.index].name;

        try {
            await updateCandidateStage(candidateId, candidate.applicationId, newStepName);
            setCandidates(prevCandidates =>
                prevCandidates.map(c =>
                    c.id === candidateId ? { ...c, currentInterviewStep: newStepName } : c
                )
            );
        } catch (error) {
            console.error('Error updating candidate stage:', error);
            // Optionally, show an error message to the user
        }
    };

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
            <DragDropContext onDragEnd={onDragEnd}>
                <Row>
                    {interviewFlow.interviewFlow.interviewSteps.map((step, index) => (
                        <Col key={index} md={3}>
                            <Droppable droppableId={index.toString()}>
                                {(provided) => (
                                    <Card className="mb-4" ref={provided.innerRef} {...provided.droppableProps}>
                                        <Card.Body>
                                            <Card.Title>{step.name}</Card.Title>
                                            {candidates
                                                .filter(candidate => candidate.currentInterviewStep === step.name)
                                                .map((candidate, idx) => (
                                                    <Draggable key={candidate.id} draggableId={candidate.id.toString()} index={idx}>
                                                        {(provided) => (
                                                            <Card className="mb-2" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </Card.Body>
                                    </Card>
                                )}
                            </Droppable>
                        </Col>
                    ))}
                </Row>
            </DragDropContext>
        </Container>
    );
};

export default PositionDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

type PositionDetails = {
    id: number;
    title: string;
    interviewFlow: {
        id: number;
        description: string;
        interviewSteps: {
            id: number;
            name: string;
            orderIndex: number;
        }[];
    };
};

type Candidate = {
    id: number;
    fullName: string;
    currentInterviewStep: string;
    averageScore: number;
};

const renderScoreEmojis = (score: number) => {
    const emojis = [];
    for (let i = 0; i < score; i++) {
        emojis.push('🟢');
    }
    return emojis.join('');
};

const Position: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [position, setPosition] = useState<PositionDetails | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPositionDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/position/${id}/interviewflow`);
                const data = await response.json();
                setPosition(data.interviewFlow);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCandidates = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/position/${id}/candidates`);
                const data = await response.json();
                setCandidates(data);
            } catch (err) {
                setError(err as Error);
            }
        };

        fetchPositionDetails();
        fetchCandidates();
    }, [id]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceIndex = candidates.findIndex(candidate => `candidate-${candidate.id}` === source.droppableId);
            const destinationIndex = candidates.findIndex(candidate => `candidate-${candidate.id}` === destination.droppableId);

            if (sourceIndex === -1 || destinationIndex === -1) return;

            const newCandidates = Array.from(candidates);
            const [removed] = newCandidates.splice(sourceIndex, 1);
            newCandidates.splice(destinationIndex, 0, removed);

            setCandidates(newCandidates);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!position) return null;

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{position.title}</h1>
                </Col>
            </Row>
            <DragDropContext onDragEnd={onDragEnd}>
                <Row>
                    {position.interviewFlow.interviewSteps.map(step => {
                        const candidatesInStep = candidates.filter(candidate => candidate.currentInterviewStep === step.name);
                        return (
                            <Col key={step.id}>
                                <Droppable droppableId={`step-${step.id}`}>
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="droppable">
                                            <Card>
                                                <Card.Header>{step.name}</Card.Header>
                                                <Card.Body>
                                                    {candidatesInStep.map((candidate, index) => (
                                                        <Draggable key={candidate.id} draggableId={`candidate-${candidate.id}`} index={index}>
                                                            {(provided) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='draggable'>
                                                                    <div className="text-center">
                                                                        <div><strong>{candidate.fullName}</strong></div>
                                                                        <div>{renderScoreEmojis(candidate.averageScore)} ({candidate.averageScore})</div>
                                                                        <hr />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )}
                                </Droppable>
                            </Col>
                        );
                    })}
                </Row>
            </DragDropContext>
        </Container>
    );
};

export default Position;

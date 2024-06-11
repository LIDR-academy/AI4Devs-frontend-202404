import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PositionsDetails = () => {
    const { id } = useParams();
    const [stages, setStages] = useState([]);
    const [positionName, setPositionName] = useState('');
    const [selectedCandidate, setSelectedCandidate] = useState(null); // Estado para el candidato seleccionado

    useEffect(() => {
        const fetchInterviewFlow = async () => {
            try {
                const response = await fetch(`http://localhost:3010/position/${id}/interviewFlow`);
                const data = await response.json();
                const interviewSteps = data.interviewFlow.interviewFlow.interviewSteps.map(step => ({
                    title: step.name,
                    id: step.id,
                    candidates: [] // Assuming no candidates initially
                }));
                setStages(interviewSteps);
                setPositionName(data.interviewFlow.positionName);
            } catch (error) {
                console.error('Error fetching interview flow:', error);
            }
        };

        const fetchCandidates = async () => {
            try {
                const response = await fetch(`http://localhost:3010/position/${id}/candidates`);
                const candidates = await response.json();
                setStages(prevStages =>
                    prevStages.map(stage => ({
                        ...stage,
                        candidates: candidates
                            .filter(candidate => candidate.currentInterviewStep === stage.title)
                            .map(candidate => ({
                                id: candidate.candidateId.toString(),
                                name: candidate.fullName,
                                rating: candidate.averageScore,
                                applicationId: candidate.applicationId
                            }))
                    }))
                );
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchInterviewFlow();
        fetchCandidates();
    }, [id]);

    const updateCandidateStep = async (candidateId, applicationId, newStep) => {
        try {
            console.log(candidateId, applicationId, newStep)
            const response = await fetch(`http://localhost:3010/candidates/${candidateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    applicationId: Number(applicationId), // Convert applicationId to number
                    currentInterviewStep: Number(newStep) // Convert newStep to number
                })
            });

            if (!response.ok) {
                throw new Error('Error updating candidate step');
            }
        } catch (error) {
            console.error('Error updating candidate step:', error);
        }
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        const sourceStage = stages[source.droppableId];
        const destStage = stages[destination.droppableId];

        console.log(destination.droppableId)

        const [movedCandidate] = sourceStage.candidates.splice(source.index, 1);
        destStage.candidates.splice(destination.index, 0, movedCandidate);

        setStages([...stages]);

        // Find the id of the destination stage
        const destStageId = stages[destination.droppableId].id;


        // Update candidate step on the server
        updateCandidateStep(movedCandidate.id, movedCandidate.applicationId, destStageId);
    };

    const handleCardClick = (candidate) => {
        setSelectedCandidate(candidate); // Guardar el candidato seleccionado en el estado
    };

    const closeSlide = () => {
        setSelectedCandidate(null); // Cerrar el slide lateral
    };

    return (
        <Container>
            <h2 className="text-center my-4">{positionName}</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Row>
                    {stages.map((stage, index) => (
                        <Col key={index} md={3}>
                            <Droppable droppableId={`${index}`}>
                                {(provided) => (
                                    <Card className="mb-4" ref={provided.innerRef} {...provided.droppableProps}>
                                        <Card.Header className="text-center">{stage.title}</Card.Header>
                                        <Card.Body>
                                            {stage.candidates.map((candidate, idx) => (
                                                <Draggable key={candidate.id} draggableId={candidate.id} index={idx}>
                                                    {(provided) => (
                                                        <Card
                                                            className="mb-2"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            onClick={() => handleCardClick(candidate)}
                                                        >
                                                            <Card.Body>
                                                                <Card.Title>{candidate.name}</Card.Title>
                                                                <div>
                                                                    {Array.from({ length: candidate.rating }).map((_, i) => (
                                                                        <span key={i} role="img" aria-label="rating">🟢</span>
                                                                    ))}
                                                                </div>
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
            {selectedCandidate && (
                <div className="slide-container">
                    <div className="slide-content">
                        <button onClick={closeSlide}>Cerrar</button>
                        <h3>Detalles del Candidato</h3>
                        <p>Nombre: {selectedCandidate.name}</p>
                        <p>Rating: {selectedCandidate.rating}</p>
                        <p>Application ID: {selectedCandidate.applicationId}</p>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default PositionsDetails;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PositionDetail = () => {
    const { id } = useParams();
    const [position, setPosition] = useState(null);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchPositionDetails = async () => {
            try {
                const { data: positionData } = await axios.get(`/position/${id}/interviewFlow`);
                setPosition(positionData);
                const { data: candidatesData } = await axios.get(`/position/${id}/candidates`);
                setCandidates(candidatesData);
            } catch (error) {
                console.error('Error fetching position details:', error);
                // Handle errors appropriately
            }
        };
        fetchPositionDetails();
    }, [id]);

    const updateCandidateStage = async (candidateId, newInterviewStep) => {
        try {
            const response = await axios.put(`/candidate/${candidateId}`, { newInterviewStep });
            console.log('Update successful:', response.data);
            // Actualizar el estado local para reflejar el cambio
            setCandidates(prevCandidates =>
                prevCandidates.map(candidate =>
                    candidate.id === candidateId ? { ...candidate, currentInterviewStep: newInterviewStep } : candidate
                )
            );
        } catch (error) {
            console.error('Error updating candidate stage:', error);
            // Manejar errores y posiblemente revertir el cambio en la interfaz de usuario
        }
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
            updateCandidateStage(candidates[source.index].id, destination.droppableId);
        }
    };

    return (
        <Container>
            <h1>{position?.positionName}</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                {position?.interviewFlow?.map((step, index) => (
                    <Droppable key={index} droppableId={String(step.id)}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <h2>{step.name}</h2>
                                {candidates.filter(c => c.currentInterviewStep === step.name).map((candidate, index) => (
                                    <Draggable key={candidate.id} draggableId={String(candidate.id)} index={index}>
                                        {(provided) => (
                                            <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Card.Body>
                                                    <Card.Title>{candidate.fullName}</Card.Title>
                                                    <Card.Text>Score: {candidate.averageScore}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </Container>
    );
};

export default PositionDetail;

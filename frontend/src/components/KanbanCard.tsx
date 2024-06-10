import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Candidate } from '../interface/types';
import { Card, Col } from 'react-bootstrap';
import '../App.css';

interface KanbanCardProps {
    candidate: Candidate;
    index: number;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ candidate, index }) => {
    return (
        <div className='kanban-card'>
            <Draggable key={candidate.candidateId} draggableId={String(candidate.candidateId)} index={index} >
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`mb-2 ${snapshot.isDragging ? 'dragging' : ''}`}>
                        <Card.Body>
                            <Card.Title className='kanban-card-title'>{candidate.fullName} </Card.Title>
                            <Card.Text>
                                Puntuación media: {candidate.averageScore} <br />
                                {/* <strong>ID:</strong> {candidate.candidateId}<br /> */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}
            </Draggable>
        </div>
    );
};

export default KanbanCard;

// Componente para representar una tarjeta draggable de un candidato
import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, Badge } from 'react-bootstrap';

interface Candidate {
    candidateID: number;
    applicationID: number;
    fullName: string;
    averageScore: number;
    currentInterviewStep: string;
}

const ItemType = 'CANDIDATE';

// Función para renderizar los círculos de puntuación
const renderScoreCircles = (score: number) => {
    return Array.from({ length: score }, (_, index) => (
        <Badge key={index} pill bg="success" className="me-1">
            &nbsp;
        </Badge>
    ));
};

const DraggableCard: React.FC<{ candidate: Candidate, className?: string }> = ({ candidate, className }) => {
    const [, ref] = useDrag({
        type: ItemType, // Define el tipo de elemento draggable
        item: { id: candidate.candidateID, applicationID: candidate.applicationID }, // Define el objeto draggable
    });

    return (
        <div ref={ref} className={className}>
            <Card className="mb-2" style={{ border: 'none' }}>
                <Card.Body>
                    <Card.Title>{candidate.fullName}</Card.Title>
                    <Card.Text>
                        {renderScoreCircles(candidate.averageScore)} 
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default DraggableCard;
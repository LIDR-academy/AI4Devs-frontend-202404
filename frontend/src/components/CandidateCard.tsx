import React from 'react';
import { Card } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';

interface Candidate {
    fullName: string;
    currentInterviewStep: string;
    averageScore: number;
}

interface CandidateCardProps {
    candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CANDIDATE',
        item: { candidate },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <Card ref={drag} className="mb-3" style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Card.Body>
                <Card.Title>{candidate.fullName}</Card.Title>
                <div>
                    {Array.from({ length: candidate.averageScore }, (_, index) => (
                        <span key={index} className="badge bg-success me-1">●</span>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
};

export default CandidateCard;

//export {};



import React from 'react';
import { Card } from 'react-bootstrap';
import CandidateCard from './CandidateCard';
import { useDrop } from 'react-dnd';

interface Candidate {
    id: number;
    fullName: string;
    applicationId: number;
    currentInterviewStep: string;
    averageScore: number;
}

interface InterviewStep {
    id: number;
    name: string;
    orderIndex: number;
}

interface KanbanColumnProps {
    step: InterviewStep;
    candidates: Candidate[];
    updateCandidates: (updateCandidate: Candidate) => void; // Added this line
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ step, candidates, updateCandidates  }) => {
    const [, drop] = useDrop({
        accept: 'CANDIDATE',
        drop: (item: { candidate: Candidate }) => {
            // Lógica para manejar el cambio de columna
            console.log(`Candidato ${item.candidate.fullName} movido a ${step.name}`);
            console.log(item.candidate);
            handleColumnChange(item.candidate);
        },
    });

    const handleColumnChange = async (candidate: Candidate) => {
        try {
            const response = await fetch(`http://localhost:3010/candidates/${candidate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    applicationId: candidate.applicationId,
                    currentInterviewStep: step.id,
                }),
            });

            if (response.ok) {
                // Actualizar el estado del candidato en el frontend
                const updatedCandidate = { ...candidate, currentInterviewStep: step.name };
                updateCandidates(updatedCandidate);
            } else {
                // Manejar el error y revertir el cambio de columna
                // ...
            }
        } catch (error) {
            console.error('Error al actualizar la etapa del candidato:', error);
            // Manejar el error y revertir el cambio de columna
            // ...
        }
    };

    return (
        <Card ref={drop} className="shadow-sm mb-4">
            <Card.Body>
                <Card.Title>{step.name}</Card.Title>
                {candidates.map((candidate, index) => (
                    <CandidateCard key={index} candidate={candidate} />
                ))}
            </Card.Body>
        </Card>
    );
};

export default KanbanColumn;

// Componente para representar una fase droppable en el proceso de entrevistas
import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableCard from './DraggableCard';
import styles from './PositionDetails.module.css';

import { Step, Candidate } from './PositionDetails';

interface DroppablePhaseProps {
    step: Step; // Información de la fase
    candidates: Candidate[]; // Lista de candidatos en esta fase
    moveCandidate: (candidateId: number, applicationId: number, newStepName: string, newStep: number) => void; // Función para mover candidatos
}

const DroppablePhase: React.FC<DroppablePhaseProps> = ({ step, candidates, moveCandidate }) => {
    const [, ref] = useDrop({
        accept: 'CANDIDATE', // Acepta elementos de tipo 'CANDIDATE'
        drop: (item: { id: number, applicationID: number }) => moveCandidate(item.id, item.applicationID, step.name, step.id), // Llama a moveCandidate cuando se suelta un candidato
    });

    return (
        <div ref={ref} className={`${styles.phaseBox} m-2`}>
            <h4>{step.name}</h4> {/* Nombre de la fase */}
            {candidates.map(candidate => (
                <DraggableCard 
                    key={candidate.candidateID} 
                    className={styles.candidateCard} 
                    candidate={{
                        ...candidate,
                        applicationID: candidate.applicationID,
                        fullName: candidate.fullName,
                        averageScore: candidate.averageScore
                    }} 
                />
            ))}
        </div>
    );
};

export default DroppablePhase;
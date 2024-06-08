import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import usePositionDetails from '../hooks/usePositionDetails';
import DroppablePhase from './DroppablePhase';
import styles from './PositionDetails.module.css';
import { updateCandidateStage } from '../services/positionService';

// Definición de tipos para Step y Candidate
type Step = {
    id: number;
    name: string;
};

type Candidate = {
    applicationID: number;
    candidateID: number;
    fullName: string;
    averageScore: number;
    currentInterviewStep: string;
};

export type { Step, Candidate };

const PositionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Obtiene el ID de la URL
    const { position, candidates, error, setCandidates } = usePositionDetails(id!); // Hook personalizado para obtener detalles de la posición

    // Función para mover un candidato a una nueva fase
    const moveCandidate = (candidateId: number, applicationId: number, newStepName: string, newStep: number) => {
        const updatedCandidates = candidates.map(candidate =>
            candidate.candidateID === candidateId ? { ...candidate, currentInterviewStep: newStepName } : candidate
        );
        updateCandidateStage(candidateId, applicationId, newStep); // Actualiza la fase del candidato en el backend
        setCandidates(updatedCandidates); // Actualiza el estado local
    };

    // Manejo de errores
    if (error) {
        return (
            <Container className={styles.container}>
                <div className="text-center">
                    <h2>{error}</h2>
                    <Link to="/positions">
                        <ArrowLeft size={24} /> Volver a posiciones
                    </Link>
                </div>
            </Container>
        );
    }

    // Si no hay posición, no renderiza nada
    if (!position) {
        return null;
    }

    // Renderiza los detalles de la posición y las fases del proceso
    return (
        <DndProvider backend={HTML5Backend}>
            <Container className={styles.container}>
                <div className="d-flex align-items-center mb-3">
                    <Link to="/positions" className="me-2">
                        <ArrowLeft size={24} />
                    </Link>
                    <h2 className="mb-0">{position.positionName}</h2>
                </div>
                <div className="d-flex flex-wrap">
                    {position.interviewFlow.interviewSteps.map((step: Step) => (
                        <DroppablePhase
                            key={step.id}
                            step={step}
                            candidates={candidates.filter(candidate => candidate.currentInterviewStep === step.name)}
                            moveCandidate={moveCandidate}
                        />
                    ))}
                </div>
            </Container>
        </DndProvider>
    );
};

export default PositionDetails;

import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';
import { Container, Card, Badge } from 'react-bootstrap';
import { getPositionDetails, getCandidatesByPosition, updateCandidateStage } from '../services/positionService';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import DraggableCard from './DraggableCard';
import styles from './PositionDetails.module.css';

interface Candidate {
    applicationID: number;
    candidateID: number;
    fullName: string;
    averageScore: number;
    currentInterviewStep: string;
}

interface Step {
    id: number;
    name: string;
}

interface DroppablePhaseProps {
    step: Step;
    candidates: Candidate[];
    moveCandidate: (candidateId: number, applicationId: number, newStepName:string, newStep: number) => void;
}

const PositionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [position, setPosition] = useState<any>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    const fetchDetails = async () => {
        try {
            const positionData = await getPositionDetails(Number(id));
            setPosition(positionData.interviewFlow);
            const candidatesData = await getCandidatesByPosition(Number(id));
            setCandidates(candidatesData);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.error('No se encontró la posición solicitada:', error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
            } else {
                console.error('Error al obtener los detalles de la posición:', error);
                // Manejo de otros tipos de errores
            }
        }
    };

    if (!position) {
        fetchDetails();
        return (
            <Container className={styles.container}>
                <div className="text-center">
                    <h2>No se encontró la posición solicitada.</h2>
                    <Link to="/positions">
                        <ArrowLeft size={24} /> Volver a posiciones
                    </Link>
                </div>
            </Container>
        );
    }

    const ItemType = 'CANDIDATE';

    const DroppablePhase: React.FC<DroppablePhaseProps> = ({ step, candidates, moveCandidate }) => {
        const [, ref] = useDrop({
            accept: ItemType,
            drop: (item: { id: number, applicationID: number }) => moveCandidate(item.id, item.applicationID, step.name, step.id),
        });

        return (
            <div ref={ref} className={`${styles.phaseBox} m-2`}>
                <h4>{step.name}</h4>
                {candidates.map(candidate => (
                    <DraggableCard key={candidate.candidateID} className={styles.candidateCard} candidate={candidate} />
                ))}
            </div>
        );
    };

    const moveCandidate = (candidateId: number, applicationId: number, newStepName: string, newStep: number) => {
        const updatedCandidates = candidates.map(candidate =>
            candidate.candidateID === candidateId ? { ...candidate, currentInterviewStep: newStepName } : candidate
        );
        updateCandidateStage(candidateId, applicationId, newStep);
        setCandidates(updatedCandidates);
    };

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

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './PositionKanbanBoard.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type Candidate = {
    id: string;
    name: string;
    score: number;
    phase: string;
};

const PhaseColumn: React.FC<{ phase: string; candidates: Candidate[] }> = ({ phase, candidates }) => (
    <div className="kanban-column">
        <h2>{phase}</h2>
        {candidates.map(candidate => (
            <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
    </div>
);

const CandidateCard: React.FC<Candidate> = ({ id, name, score }) => (
    <div className="candidate-card">
        <h3>{name}</h3>
        <p>Puntuación: {score}</p>
    </div>
);

const PositionKanbanBoard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get(`/position/${id}/candidates`);
                setCandidates(response.data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchCandidates();
    }, [id]);

    // Organizar candidatos por fase
    const phases = ['Applied', 'Interviewing', 'Offer', 'Hired'];
    const candidatesByPhase = phases.map(phase => ({
        phase,
        candidates: candidates.filter(candidate => candidate.phase === phase)
    }));

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        // Lógica para reordenar los candidatos o mover entre fases
        const sourceIndex = source.index;
        const destinationIndex = destination.index;
        const sourcePhase = source.droppableId;
        const destinationPhase = destination.droppableId;

        if (sourcePhase !== destinationPhase) {
            const candidateMoved = candidates[sourceIndex];
            updateCandidatePhase(candidateMoved.id, destinationPhase);
        }
    };

    const updateCandidatePhase = async (candidateId, newPhase) => {
        try {
            await axios.put(`/candidates/${candidateId}/stage`, { phase: newPhase });
            // Actualizar el estado local si es necesario
        } catch (error) {
            console.error('Error updating candidate phase:', error);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                <div className="d-flex flex-column flex-md-row align-items-center mb-4">
                    <Link to="/positions">
                        <Button variant="secondary">← Volver a Posiciones</Button>
                    </Link>
                    <h1 className="ms-3">Título de la Posición</h1>
                </div>
                <div className="kanban-board d-flex flex-column flex-md-row">
                    {candidatesByPhase.map(({ phase, candidates }) => (
                        <PhaseColumn key={phase} phase={phase} candidates={candidates} />
                    ))}
                </div>
            </Container>
        </DragDropContext>
    );
};

export default PositionKanbanBoard;

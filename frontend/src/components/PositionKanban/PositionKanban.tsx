import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { Container, Row } from 'react-bootstrap';
import KanbanColumn from '../KanbanColumn/KanbanColumn';
import BackButton from '../BackButton/BackButton';
import styles from './PositionKanban.module.css';
import { InterviewFlow } from '../../types/inverviewFlow.type';
import { Candidate } from '../../types/candidate.type';

// Mock data for flowData
const mockFlowData: InterviewFlow = {
    positionName: "Software Engineer",
    interviewSteps: [
      { id: 1, name: "Llamada telefónica", orderIndex: 1 },
      { id: 2, name: "Entrevista técnica", orderIndex: 2 },
      { id: 3, name: "Entrevista RRHH", orderIndex: 3 }
    ]
  };
  
// Mock data for candidatesData
const mockCandidatesData: Candidate[] = [
{ id: 1, name: "Alice Johnson", current_interview_step: 1, score: 90 },
{ id: 2, name: "Bob Smith", current_interview_step: 2, score: 55 },
{ id: 3, name: "Charlie Brown", current_interview_step: 3, score: 25 }
];

// Asegúrate de que las interfaces y los datos mock sigan estando definidos aquí o sean importados si están en archivos separados

const PositionKanban: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [interviewFlow, setInterviewFlow] = useState<InterviewFlow | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setInterviewFlow(mockFlowData);
      setCandidates(mockCandidatesData);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  if (!interviewFlow) return <div>Loading...</div>;

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // No hacer nada si el item no se movió a un destino válido

    const { source, destination } = result;

    // Si el ítem se devuelve a la misma posición, no hacer nada
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Encontrar el candidato que fue movido
    const candidateMoved = candidates.find(candidate => `candidate-${candidate.id}` === result.draggableId);

    if (!candidateMoved) return; // Si por alguna razón no se encuentra el candidato, no hacer nada

    // send data to backend

    // Actualizar el paso del candidato movido
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === candidateMoved.id) {
        return { ...candidate, current_interview_step: parseInt(destination.droppableId) };
      }
      return candidate;
    });

    // Actualizar el estado de los candidatos
    setCandidates(updatedCandidates);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className={styles.kanbanBoard}>
      <BackButton />
      <h1>Posición: {interviewFlow.positionName}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          {interviewFlow.interviewSteps
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((step) => (
              <KanbanColumn key={step.id} step={step} candidates={candidates.filter(candidate => candidate.current_interview_step === step.id)} />
            ))}
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default PositionKanban;
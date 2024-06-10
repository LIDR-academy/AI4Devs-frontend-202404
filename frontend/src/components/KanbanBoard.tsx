import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';
import { InterviewStep, Candidate } from '../interface/types';
import { updateCandidate } from '../services/candidateService';
import '../App.css';

interface KanbanBoardProps {
    interviewStep: InterviewStep[];
    candidates: Candidate[];
    setCandidates: (candidates: Candidate[]) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ interviewStep, candidates, setCandidates }) => {
    const onDragEnd = async (result: any) => {
        const { source, destination } = result;

        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return; // No hacer nada si no hay destino o la tarjeta se movió al mismo lugar
        }

        // Encuentra el candidato movido usando el draggableId, que debería ser el candidateId
        const movedCandidate = candidates.find(c => c.candidateId === Number(result.draggableId));
        if (!movedCandidate) {
            console.error('Candidato no encontrado');
            return;
        }

        const newCandidates = Array.from(candidates);
        const sourceIndex = candidates.indexOf(movedCandidate);
        newCandidates.splice(sourceIndex, 1);
        newCandidates.splice(destination.index, 0, movedCandidate);

        const destinationStep = interviewStep.find(step => step.name === destination.droppableId);
        if (destinationStep) {
            try {
                await updateCandidate(movedCandidate.candidateId, destinationStep.id, movedCandidate.applicationId);
                movedCandidate.currentInterviewStep = destinationStep.name;
                setCandidates(newCandidates);
            } catch (error) {
                console.error('Error updating candidate:', error);
                setCandidates(candidates); // Revertir al estado original si la actualización falla
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-board">
                {interviewStep.map((flow) => (
                    <Droppable key={flow.id} droppableId={flow.name}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-column">
                                <KanbanColumn title={flow.name} candidates={candidates.filter(c => c.currentInterviewStep === flow.name)} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;

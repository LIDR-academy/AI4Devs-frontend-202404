import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Candidate } from '../interface/types';
import '../App.css';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
    title: string;
    candidates: Candidate[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, candidates }) => {
    return (
        <div>
            <h3 className="kanban-title">{title}</h3>
            {candidates.map((candidate, index) => (
                <KanbanCard key={candidate.candidateId} candidate={candidate} index={index} />
            ))}
        </div>
    );
};

export default KanbanColumn;


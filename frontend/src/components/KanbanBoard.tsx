import React from 'react';
import KanbanColumn from './KanbanColumn';
import { Candidate } from '../types/index';
import '../App.css';

const KanbanBoard: React.FC<{ phases: string[]; candidates: Candidate[] }> = ({ phases, candidates }) => {
    return (
        <div className="kanban-board">
            {phases.map(phase => (
                <KanbanColumn key={phase} phase={phase} candidates={candidates.filter(c => c.phase === phase)} />
            ))}
        </div>
    );
};

export default KanbanBoard;


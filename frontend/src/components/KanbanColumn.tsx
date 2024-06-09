// src/components/KanbanColumn.tsx
import React from 'react';
import CandidateCard from './CandidateCard';
import '../App.css';
import { Candidate } from '../types';

const KanbanColumn: React.FC<{ phase: string; candidates: Candidate[] }> = ({ phase, candidates }) => {
    return (
        <div className="kanban-column">
            <h2>{phase}</h2>
            {candidates.map(candidate => <CandidateCard key={candidate.id} candidate={candidate} />)}
        </div>
    );
};

export default KanbanColumn;

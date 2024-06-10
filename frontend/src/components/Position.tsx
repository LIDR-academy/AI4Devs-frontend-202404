import React from 'react';
import { useLocation } from 'react-router-dom';
import PositionHeader from './PositionHeader';
import KanbanBoard from './KanbanBoard';

const Position: React.FC = () => {
    const location = useLocation();
    const { position } = location.state;

    // Mock data for candidates
    const candidates = [
        { id: 1, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", phase: "Technical Interview", averageScore: 4 },
        { id: 2, firstName: "Carlos", lastName: "García", email: "carlos.garcia@example.com", phase: "Initial Screening", averageScore: 0 },
        { id: 3, firstName: "John", lastName: "Doe", email: "john.doe@example.com", phase: "Manager Interview", averageScore: 5 }
    ];

    // Phases extracted from candidates data
    const phases = Array.from(new Set(candidates.map(candidate => candidate.phase)));

    return (
        <div>
            <PositionHeader title={position.title} />
            <KanbanBoard phases={phases} candidates={candidates} />
        </div>
    );
};

export default Position;

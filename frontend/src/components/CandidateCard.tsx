import React from 'react';
import { Candidate } from '../types/index';
import '../App.css';

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
    return (
        <div className="candidate-card">
            <p>{candidate.firstName} {candidate.lastName}</p>
            <p>Score: {candidate.averageScore}</p>
        </div>
    );
};

export default CandidateCard;

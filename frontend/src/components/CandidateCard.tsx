import React from 'react';
import { Candidate } from '../types/index';
import RatingCircle from './RatingCircle';
import '../App.css';

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
    return (
        <div className="candidate-card">
            <p>{candidate.firstName} {candidate.lastName}</p>
            <p>Score: {candidate.averageScore}</p>
            <RatingCircle score={candidate.averageScore} />
        </div>
    );
};

export default CandidateCard;

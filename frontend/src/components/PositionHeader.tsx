import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

const PositionHeader: React.FC<{ title: string }> = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div>
            <ArrowLeft onClick={() => navigate(-1)} />
            <h1>{title}</h1>
        </div>
    );
};

export default PositionHeader;

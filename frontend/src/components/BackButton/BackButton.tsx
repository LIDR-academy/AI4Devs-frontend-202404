import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';  // Importa Button de react-bootstrap

const BackButton: React.FC = () => {
    const navigate = useNavigate();
  
    const handleBack = () => {
      navigate(-1); // Navega una página hacia atrás en el historial del navegador
    };
  
    return (
      <Button onClick={handleBack} variant="secondary">  
        Volver
      </Button>
    );
  };
  
  export default BackButton;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecruiterDashboard from './components/RecruiterDashboard';
import AddCandidate from './components/AddCandidateForm'; 
import Positions from './components/Positions'; 
import PositionKanban from './components/PositionKanban/PositionKanban'; // Asegúrate de importar el componente adecuado

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecruiterDashboard />} />
        <Route path="/add-candidate" element={<AddCandidate />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/positions/:id/kanban" element={<PositionKanban />} /> {/* Nueva ruta para el Kanban board */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RecruiterDashboard from './components/RecruiterDashboard';
import AddCandidate from './components/AddCandidateForm'; 
import Positions from './components/Positions'; 
import PositionDetails from './components/PositionDetails';


const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecruiterDashboard />} />
          <Route path="/add-candidate" element={<AddCandidate />} /> {/* Agrega esta línea */}
          <Route path="/positions" element={<Positions />} />
          <Route path="/position/:id" element={<PositionDetails />} />
        </Routes>
    </BrowserRouter>
    </DndProvider>
  );
};

export default App;
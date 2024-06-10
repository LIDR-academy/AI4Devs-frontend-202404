import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import PositionDetails from './components/PositionDetails';
import Positions from './components/Positions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.css';
import logo from './logo.svg';


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <Routes>
            <Route path="/" element={<Positions />} />
            <Route path="/position/:id" element={<PositionDetails />} />
            {/* Otras rutas pueden ser agregadas aquí */}
          </Routes>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;

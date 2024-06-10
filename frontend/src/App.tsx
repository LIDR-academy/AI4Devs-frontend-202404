import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Positions from './components/Positions';
import PositionDetails from './components/PositionDetails';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Positions />} />
                <Route path="/position/:id" element={<PositionDetails />} />
            </Routes>
        </Router>
    );
};

export default App;

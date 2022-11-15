import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import Journal from 'routes/Journal';
import Analysis from 'routes/Analylsis';
const AppRouter = () => {
    return (
        <Router base='/'>
            <Routes>
                <Route path='/profile' element={Profile} />
                <Route path='/journal' element={Journal} />
                <Route path='/analysis' element={Analysis} />
            </Routes>
            
        </Router>
    );
      
}

export default AppRouter;
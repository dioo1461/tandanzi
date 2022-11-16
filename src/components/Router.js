import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import Journal from 'routes/Journal';
import Analysis from 'routes/Analysis';
import Foodpedia from 'routes/Foodpedia';
import Auth from 'routes/Auth';
const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router base='/'>
            <Routes>
                { isLoggedIn ? (
                    <>
                        <Route exact path='/user/profile' element={<Profile />} />
                        <Route exact path='/user/journal' element={<Journal />} />
                    </>
                ) : (
                    <Route path='/user' element={<Auth />} />
                )}
                <Route exact path='/analysis' element={<Analysis />} />
                <Route exact path='/foodpedia' element={<Foodpedia />} />
            </Routes>
        </Router>
    );

}

export default AppRouter;
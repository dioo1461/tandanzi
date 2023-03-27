import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Journal from 'routes/Journal';
import Analysis from 'routes/Analysis';
import Foodpedia from 'routes/Foodpedia';
import Auth, { logout } from 'routes/Auth/Auth';
import Header from 'layout/header/Header';
import { Button } from 'react-bootstrap';
const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router base='/'>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />} />
                { isLoggedIn ? (
                    <>
                        <Route exact path='/user/profile' element={<Profile />} />
                        <Route exact path='/user/journal' element={<Journal />} />
                    </>
                ) : (
                    <>
                        <Route path='/auth' element={<Auth />} />
                    </>
                )}
                <Route exact path='/analysis' element={<Analysis />} />
                <Route exact path='/foodpedia' element={<Foodpedia />} />
            </Routes>
        </Router>
    );

}

export default AppRouter;
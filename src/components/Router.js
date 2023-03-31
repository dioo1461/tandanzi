// |이 코드는 React Router를 사용하여 다양한 경로에 대한 라우팅을 구현하는 것입니다.
// |
// |좋은 점:
// |- 코드가 모듈화되어 있어서 가독성이 좋습니다.
// |- React Router를 사용하여 라우팅을 구현하고 있어서, 사용자가 URL을 변경할 때마다 새로운 페이지를 렌더링할 수 있습니다.
// |- useState를 사용하여 isLoggedIn 상태를 관리하고 있어서, 로그인 여부에 따라 다른 경로를 렌더링할 수 있습니다.
// |
// |나쁜 점:
// |- Router의 base 속성이 설정되어 있지 않아서, URL 경로가 정확하지 않을 수 있습니다.
// |- Routes 컴포넌트 안에 있는 Route 컴포넌트들이 중복되는 코드를 가지고 있어서, 코드의 양이 많아질 수 있습니다. 이를 개선하기 위해서는, Route 컴포넌트를 하나의 배열로 묶어서 중복을 제거할 수 있습니다.
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from 'routes/Home';
import Profile from 'routes/profile/Profile';
import Journal from 'routes/Journal';
import Analysis from 'routes/Analysis';
import Foodpedia from 'routes/Foodpedia';
import Auth, { logout } from 'routes/auth/Auth';
import Header from 'layout/header/Header';
import { Button } from 'react-bootstrap';
import Signup from 'routes/auth/Signup';
import { CheckIsLoggedIn } from 'api/auth/login/LoginJwtMethods';
import MenuRecommendation from 'routes/MenuRecommendation';
const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router base='/'>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                { CheckIsLoggedIn() ? 
                <>
                    <Route exact path='/user/profile' element={<Profile />} />
                    <Route exact path='/user/journal' element={<Journal />} />
                </> 
                :
                <>
                    <Route exact path='/user/profile' element={<Auth />} />
                    <Route exact path='/user/journal' element={<Auth />} />
                </> 
                }
                <Route path='/auth' element={<Auth />} />
                <Route path='/auth/sign-up' element={<Signup />} />

                <Route exact path='/analysis' element={<Analysis />} />
                <Route exact path='/foodpedia' element={<Foodpedia />} />
                <Route exact path='/menu-recommendation' element={<MenuRecommendation/>} />
            </Routes>
        </Router>
    );

}

export default AppRouter;
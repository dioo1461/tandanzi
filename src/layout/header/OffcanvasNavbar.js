// |이 코드는 React-Bootstrap을 사용하여 Offcanvas Navbar를 구현하는 코드입니다.
// |
// |좋은 점:
// |- React-Bootstrap을 사용하여 쉽게 Navbar를 구현할 수 있습니다.
// |- Offcanvas를 사용하여 작은 화면에서도 Navbar를 효과적으로 사용할 수 있습니다.
// |- 로그인 여부에 따라 다른 Nav.Link를 보여주는 기능이 구현되어 있습니다.
// |
// |나쁜 점:
// |- 코드의 가독성이 떨어집니다. 변수명이나 함수명이 명확하지 않아 코드를 이해하기 어렵습니다.
// |- 코드의 중복이 있습니다. Nav.Link를 여러 번 사용하는 부분이 있어 코드의 양이 많아집니다.
// |- 로그아웃 기능이 구현되어 있지만, 로그인 기능은 단순히 href로 이동하는 방식으로 구현되어 있어 보안에 취약합니다.
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { logout } from "routes/auth/Login";
import { useLinkClickHandler, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CheckIsLoggedIn } from "components/auth/login/CheckIsLoggedIn";


const OffcanvasNavbar = () => {
  const location = useLocation();
    const expand = 'md';

    return(
        <Navbar bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/">탄단지</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  탄단지
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {CheckIsLoggedIn ?
                  <>
                    <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                    <Nav.Link href='/user/profile'>내 프로필</Nav.Link>
                  </>
                  :
                  <Nav.Link href='/auth'>로그인</Nav.Link>
                  
                  }
                  <Nav.Link href="/analysis">칼로리 분석</Nav.Link>
                  <Nav.Link href="/">칼로리 사전</Nav.Link>
                  <Nav.Link href="/">식사 일지</Nav.Link>
                  <Nav.Link href="/">메뉴 추천</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  );

}

export default OffcanvasNavbar;
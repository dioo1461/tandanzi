import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";


const OffcanvasNavbar = () => {
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
                  <Nav.Link href="/">로그인 / 내 프로필</Nav.Link>
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
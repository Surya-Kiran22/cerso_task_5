import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="danger" variant="dark" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="Logo" width="40" height="40" className="me-2" style={{ filter: 'brightness(0) invert(1)' }} />
          FoodExpress
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {user ? (
              <>
                {user.isAdmin && <Nav.Link as={Link} to="/dashboard">Admin Dashboard</Nav.Link>}
                <Button variant="outline-light" onClick={logout} className="ms-3">Logout ({user.name})</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

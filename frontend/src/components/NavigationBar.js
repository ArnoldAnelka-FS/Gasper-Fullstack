import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="transparent" expand="lg">
      <Navbar aria-controls="navbar-nav" />
      <Navbar id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/dashboard" style={{ color: '#61dafb' }} className="mr-3">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/new-order" style={{ color: '#61dafb' }} className="mr-3">
            Place Order
          </Nav.Link>
          <Nav.Link as={Link} to="/tracking" style={{ color: '#61dafb' }} className="mr-3">
            Tracking
          </Nav.Link>
          <Nav.Link as={Link} to="/checkout" style={{ color: '#61dafb' }} className="mr-3">
            Cart
          </Nav.Link>
          <Nav.Link as={Link} to="/signin" style={{ color: '#61dafb' }} className="mr-3">

            Signout
          </Nav.Link>
          

        </Nav>
      </Navbar>
    </Navbar>
  );
};

export default NavigationBar;
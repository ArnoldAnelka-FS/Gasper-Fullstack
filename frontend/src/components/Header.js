import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  return (
    <Navbar bg="black" variant="dark" className="custom-header">
      <Navbar.Brand href="#home" className="flash-text">
        
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
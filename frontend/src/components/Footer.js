import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'black', color: '#61daFB', padding: '20px' }}>
      <Container>
        <div style={{ textAlign: 'center' }}>
          <p>
            <Link to="/contact" style={{ color: '#61daFB', textDecoration: 'none' }}>Contact Us</Link>
          </p>
          <p>&copy; {new Date().getFullYear()} Gasper. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

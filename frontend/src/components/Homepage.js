import React from 'react';
import { Container, Button } from 'react-bootstrap';
import SignupForm from './SignupForm'; 
import NavigationBar from './NavigationBar';

 
const Homepage = () => {
  return (
    <Container fluid>
      <NavigationBar/>
      <SignupForm/>
    
    </Container>
  );
};


export default Homepage;
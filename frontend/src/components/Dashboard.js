import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import { jwtDecode } from 'jwt-decode';
import pic1 from '../images/pic1.jpeg';

const Dashboard = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get user information
      const decodedToken = jwtDecode(token);
      // Set the user's first name
      setFirstName(decodedToken.name);
    }
  }, []);

  const handleNewOrder = () => {
    navigate('/new-order'); 
  };

  return (
    <div>
      <NavigationBar />
      <Container fluid>
        <div>
          <br />
          <br />
          <Button onClick={handleNewOrder}>Place New Order</Button>
        </div>
        <br></br>
        <img src={pic1} alt="pic1" style={{ width: '600px', height: 'auto' }}></img>
      </Container>
    </div>
  );
};

export default Dashboard;
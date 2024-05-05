import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission 

    try {
      // Authenticate user
      const response = await axios.post('http://localhost:5000/api/signin', {
        email,
        password,
      });

      // Reset error state
      setError('');

      // Redirect to dashboard after successful sign-in
      navigate('/dashboard'); 
    } catch (error) {
      // Handle authentication error
      setError('Invalid email or password');
      console.error('Error signing in:', error);
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Redirect to sign-up page
  };

  return (
    <Container fluid>
      <div className="signin-page" style={{ border: '2px solid #61dafb', padding: '20px', borderRadius: '10px', width: '400px' }}>
        <br />
        <h2 className="text-center">Sign In</h2>
        <Form onSubmit={handleSignIn}> 
        <br></br>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: '40px' }}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: '40px' }}
            />
          </Form.Group>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          <br></br>
          <Button variant="primary" type="submit">Sign In
          </Button>
        </Form>
        
        <Button variant="link" onClick={handleSignUp} style={{ marginTop: '10px', color: '#61dafb' }}>Don't have an account? Sign Up</Button>
      </div>
    </Container>
  );
};

export default SigninPage;

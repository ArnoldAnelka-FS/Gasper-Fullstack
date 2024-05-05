import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignInClick = () => {
    // Redirect to the sign-in page if already a member
    navigate('/signin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    try {
      // Form validation
      if (!firstName || !lastName || !address || !city || !state || !zipCode || !email || !phoneNumber || !password || !confirmPassword) {
        setErrors({ general: 'All fields are required' });
        return;
      }

      if (password !== confirmPassword) {
        setErrors({ confirmPassword: 'Passwords do not match' });
        return;
      }
      
      // Signup 
      const response = await axios.post('http://localhost:5000/api/signup', {
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode,
        email,
        phoneNumber,
        password,
      });

      // Store the user's first name in local storage
      localStorage.setItem('firstName', firstName);

      console.log('Backend response:', response.data);

      // Reset form state variables
      setFirstName('');
      setLastName('');
      setAddress('');
      setCity('');
      setState('');
      setZipCode('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting signup form:', error.message);
      if (error.response) {
        // Server responded with an error status code
        setErrors({ general: error.response.data.error || 'Server error' });
      } else if (error.request) {
        // Request made but no response received
        setErrors({ general: 'Network error' });
      } else {
        // Other errors
        setErrors({ general: 'An error occurred' });
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-end">
        <Col md={4} className="text-right">
          <Button variant="outline-primary" onClick={handleSignInClick} className="mt-9">
            Sign In
          </Button>
          <br></br>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="signup-form-container" style={{ border: '2px solid #61dafb', padding: '20px', borderRadius: '10px' }}>
            <h2 className="text-center">Signup</h2>
            <Form onSubmit={handleSubmit}>
              {errors.general && <Alert variant="danger">{errors.general}</Alert>}
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formZipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password Must be 8 Characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              
              {errors.confirmPassword && <Alert variant="danger">{errors.confirmPassword}</Alert>}
              <Button variant="outline-primary" type="submit" className="float-right mt-3">
                Sign Up
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;

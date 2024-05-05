import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { createOrder } from '../utils/api';
import NavigationBar from './NavigationBar';

const NewOrder = () => {
  const [orderData, setOrderData] = useState({
    gasType: '',
    amount: '',
    fillTank: false, 
    billingAddress: '',
    deliveryAddress: '',
    sameAsBilling: false,
    city: '',
    state: '',
    zipcode: '',
    deliveryWindow: 'O',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSameAsBillingChange = (e) => {
    const { checked } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      sameAsBilling: checked,
      deliveryAddress: checked ? prevData.billingAddress : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOrder(orderData);
      const response = await createOrder(orderData);
      navigate('/checkout', { state: { orderSummary: orderData } }); // Pass the order data to checkout page
      setOrderData({
        gasType: '',
        amount: '',
        fillTank: false,
        creditCard: '',
        expirationDate: '',
        billingAddress: '',
        deliveryAddress: '',
        sameAsBilling: false,
        city: '',
        state: '',
        zipcode: '',
        deliveryWindow: 'O',
      });
    } catch (error) {
      console.error('Error creating order:', error.message);
    }
  };

  return (
    <div>
      <NavigationBar />
      <Container fluid>
        <h3>Place new order</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Gas Type</Form.Label>
                <Form.Control
                  as="select"
                  name="gasType"
                  value={orderData.gasType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gas Type</option>
                  <option value="regular">Regular Gas</option>
                  <option value="premium">Premium Gas</option>
                  <option value="diesel">Diesel Gas</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Amount of Gas (Dollar Amount)</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={orderData.amount}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Fill Tank"
                  name="fillTank"
                  checked={orderData.fillTank}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <h3>Payment Information</h3>
              <Form.Group>
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="creditCard"
                  value={orderData.creditCard}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                  type="text"
                  name="expirationDate"
                  value={orderData.expirationDate}
                  onChange={handleChange}
                  placeholder="MM/YYYY"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Billing Address</Form.Label>
                <Form.Control
                  type="text"
                  name="billingAddress"
                  value={orderData.billingAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control
                  type="text"
                  name="deliveryAddress"
                  value={orderData.deliveryAddress}
                  onChange={handleChange}
                  disabled={orderData.sameAsBilling}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Same as Billing Address"
                  name="sameAsBilling"
                  checked={orderData.sameAsBilling}
                  onChange={handleSameAsBillingChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={orderData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={orderData.state}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zipcode"
                  value={orderData.zipcode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Delivery Window</Form.Label>
                <Form.Control
                  as="select"
                  name="deliveryWindow"
                  value={orderData.deliveryWindow}
                  onChange={handleChange}
                  required
                >
                  <option value="0">9am-2pm</option>
                  <option value="1">11am-4pm</option>
                  <option value="2">12pm-5pm</option>
                  <option value="3">1pm-6pm</option>
                  <option value="4">3pm-8pm</option>
                  <option value="5">5pm-10pm</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Place Order
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default NewOrder;

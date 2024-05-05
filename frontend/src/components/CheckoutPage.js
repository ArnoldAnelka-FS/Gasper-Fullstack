import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const Checkout = () => {
  const { state } = useLocation();
  const orderData = state?.orderSummary;
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleTrackingButtonClick = () => {
    // Redirect to the tracking page
    navigate('/tracking');
  };

  // Function to get the last four digits of the credit card number
  const getLastFourDigits = (creditCard) => {
    return creditCard.slice(-4);
  };

  // Function to get the delivery window description based on the value
  const getDeliveryWindowDescription = (windowValue) => {
    switch (windowValue) {
      case '0':
        return '9am-2pm';
      case '3':
        return '11am-4pm';
      case '6':
        return '12pm-5pm';
      case '9':
        return '1pm-6pm';
      case '12':
        return '3pm-8pm';
      case '15':
        return '5pm-10pm';
      default:
        return 'Not specified';
    }
  };

  return (
    <div>
      <NavigationBar />
      <Container fluid>
        <h2>Your order has been placed!</h2>
        <p>Want to see where your fuel technician is? <br />
          Click the link below for real-time tracking!</p>
        <button onClick={handleTrackingButtonClick}>Real Time Tracking</button>
        <br />
        {orderData && ( // Conditionally render the order summary if orderData exists
          <div style={{ border: '2px solid #61dafb', padding: '20px', textAlign: 'center' }}> {/* Inline styles */}
            <h2>Your order summary:</h2>
            <p>Gas Type: {orderData?.gasType}</p>
            <p>Amount: {orderData?.amount}</p>
            <p>Fill Tank: {orderData?.fillTank ? 'Yes' : 'No'}</p>
            <p>Credit Card: **** **** **** {getLastFourDigits(orderData?.creditCard)}</p> {/* Display only the last four digits */}
            <p>Expiration Date: {orderData?.expirationDate}</p>
            <p>Billing Address: {orderData?.billingAddress}</p>
            <p>Delivery Address: {orderData?.deliveryAddress}</p>
            <p>Delivery Window: {getDeliveryWindowDescription(orderData?.deliveryWindow)}</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Checkout;
import axios from 'axios';

export const createOrder = async (orderData) => {
  try {
    // POST request to backend API endpoint
    const response = await axios.post('http://localhost:5000/api/orders', orderData);
    
    // Return the response data 
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    throw new Error('Failed to create order: ' + error.message);
  }
};
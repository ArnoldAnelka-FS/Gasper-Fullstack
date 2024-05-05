const express = require('express');
const router = express.Router();
const Order = require('../models/ordersModel');

// Handle order creation
router.post('/', async (req, res) => {
  try {
    // Create a new order
    const order = new Order(req.body);
    // Write to the database
    const savedOrder = await order.save(); // Save the order to the database
    console.log('Order saved successfully:', savedOrder);
    res.status(201).json({ 
      message: "Order saved successfully",
      order: savedOrder
    }); 
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Handle fetching order history
router.get('/', async (req, res) => {
  try {
    // Fetch order history from the database
    const orders = await Order.find(); 
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
});

// Handle updating an order
router.put('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Handle deleting an order
router.delete('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;
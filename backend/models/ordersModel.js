const mongoose = require('mongoose');

// Schema for the Order 
const ordersSchema = new mongoose.Schema({
  gasType: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  fillTank: {
    type: Boolean,
    default: false
  },
  creditCard: {
    type: String,
    required: true
  },
  expirationDate: {
    type: String,
    required: true
  },
  billingAddress: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  sameAsBilling: {
    type: Boolean,
    required: true
  },
  deliveryWindow: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Order 
const OrderModel = mongoose.model('Order', ordersSchema);


module.exports = OrderModel;
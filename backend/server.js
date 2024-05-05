require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('./models/usersModel');
const Order = require('./models/ordersModel');

const ordersRouter = require('./routes/orders')
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes for handling orders
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);

// Route for handling user signups
app.post('/api/signup', async (req, res) => {
  try {
    // Extract signup data from request body
    const { firstName, lastName, address, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      address,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message and saved user data
    res.status(201).json({ 
      message: "Signup successful",
      user: newUser
    }); 
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Handle sign-in form submission
app.post('/api/signin', async (req, res) => {
  try {
    // Extract email and password
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check password
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT token with user ID and name in the payload
    const token = jwt.sign({ userId: user._id, name: user.firstName }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with token
    res.json({ token });
  } catch (error) {
    console.error('Error handling sign-in form submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

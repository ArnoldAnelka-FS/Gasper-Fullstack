const User = require('../models/usersModel');

// Controller for handling user-related operations
const userController = {
  // Function to handle user signup
  signup: async (req, res) => {
    try {
      // Extract user data from request body
      const { firstName, lastName, address, email, password } = req.body;

      // Form validation
      if (!firstName || !lastName || !address || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if email already exists in the database
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
        message: "User created successfully",
        user: newUser
      }); 
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
};
// Function to handle fetching user data
getUsers: async (req, res) => {
  try {
    // Fetch user data from the database
    const users = await User.find(); 
    res.json({ users });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}

module.exports = userController;
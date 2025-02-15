const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Users = require('../models/Users');

// ✅ Elderly User Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log("📩 Incoming Request Data:", req.body); // ✅ Debugging log

    const { name, email, password, role, age, gender, address, interests, skills, availability } = req.body;

    // ✅ Check if the `role` field is provided
    if (!role) {
      return res.status(400).json({ message: "Role is required." });
    }

    // ✅ Check if the user already exists
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // ✅ Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new User with the required fields
    const user = new Users({
      name, 
      email, 
      password: hashedPassword, 
      role, // ✅ Ensure role is saved
      age, 
      gender, 
      address, 
      interests, 
      skills, 
      availability 
    });

    await user.save();
    console.log("✅ User Registered Successfully:", user);

    res.status(201).json({ message: 'User registered successfully!', userId: user._id });

  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ error: 'Error registering user', details: err.message });
  }
});

// ✅ Register Users Route (Alternative)
router.post('/register', async (req, res) => {
  try {
    console.log("📩 Incoming Registration Data:", req.body); // ✅ Debugging log

    const { name, role, age, gender, address, interests, skills, availability } = req.body;

    // ✅ Check if role is missing
    if (!role) {
      return res.status(400).json({ message: "Role is required." });
    }

    const user = new Users({ name, role, age, gender, address, interests, skills, availability });
    await user.save();

    console.log("✅ User Registered Successfully:", user);
    
    res.status(201).json({ message: 'User registered successfully!', user });

  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(400).json({ error: 'Error registering user', details: err.message });
  }
});

module.exports = router;

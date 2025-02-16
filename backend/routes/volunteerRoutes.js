const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken"); 
const Volunteer = require('../models/Volunteer');

const router = express.Router();

// ✅ Volunteer Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, age, gender, address, interests, skills, role, availability } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // ✅ Check if the volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ message: 'Volunteer already exists' });
    }

    // ✅ Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new Volunteer with ROLE
    const volunteer = new Volunteer({
      name,
      email,
      password: hashedPassword, // Store hashed password
      role: role || "volunteer", // Default role if not provided
      age,
      gender,
      address,
      interests: interests || [],
      skills: skills || [],
      availability: availability || []
    });

    await volunteer.save();
    console.log("✅ Volunteer Registered Successfully:", volunteer);

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: volunteer._id, email: volunteer.email, role: volunteer.role }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ✅ Send response with token
    res.status(201).json({ 
      message: 'Volunteer registered successfully!', 
      userId: volunteer._id,
      token  // ✅ Send token in response
    });

  } catch (err) {
    console.error("🚨 Signup Error:", err);
    res.status(500).json({ error: 'Error registering volunteer', details: err.message });
  }
});

// ✅ Volunteer Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // ✅ Find Volunteer by email
    const user = await Volunteer.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // ✅ Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ✅ Send response with token
    res.json({
      message: 'Login successful!',
      userId: user._id,
      token
    });

  } catch (error) {
    console.error("🚨 Login Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ Volunteer Update Route
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🛠 Updating volunteer with ID:", id);

    const updatedData = req.body;
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedVolunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.status(200).json({ message: 'Volunteer updated successfully', updatedVolunteer });

  } catch (error) {
    console.error("🚨 Error updating volunteer:", error);
    res.status(500).json({ message: 'Error updating volunteer', error: error.message });
  }
});

module.exports = router;

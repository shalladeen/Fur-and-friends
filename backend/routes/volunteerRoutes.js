const express = require('express');
const bcrypt = require('bcrypt');
const Volunteer = require('../models/Volunteer');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, age, gender, address, interests, skills, availability } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ message: 'Volunteer already exists' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new Volunteer with ROLE
    const volunteer = new Volunteer({
      name,
      email,
      password: hashedPassword, // Store hashed password
      role: "volunteer",  // ✅ Ensure role is set
      age,
      gender,
      address,
      interests: interests || [],
      skills: skills || [],
      availability: availability || []
    });

    await volunteer.save();
    console.log("✅ Volunteer Registered Successfully:", volunteer);

    res.status(201).json({ message: 'Volunteer registered successfully!', userId: volunteer._id });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: 'Error registering volunteer', details: err.message });
  }
});

module.exports = router;

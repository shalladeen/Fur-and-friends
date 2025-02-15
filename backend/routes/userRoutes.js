const express = require('express');
const router = express.Router();
const User = require('../models/Users');

// ✅ Get all users (Optionally filter by role)
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    const users = role ? await User.find({ role }) : await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create a user (Ensure role is provided)
router.post('/', async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!role || !['elderly', 'volunteer'].includes(role)) {
      return res.status(400).json({ error: 'Role must be "elderly" or "volunteer"' });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
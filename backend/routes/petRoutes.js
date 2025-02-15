const express = require('express');
const Pet = require('../models/Pets');
const Users = require('../models/Users');

const router = express.Router();

// Register a Therapy Pet
router.post('/register', async (req, res) => {
  const { name, type, breed, allergies, availability } = req.body;

  try {
    const pet = new Pet({ name, type, breed, allergies, availability });
    await pet.save();
    res.status(201).json({ message: 'Pet registered successfully!', pet });
  } catch (err) {
    res.status(400).json({ error: 'Error registering pet', details: err });
  }
});

// Match Pets to Elderly Users
router.post('/match', async (req, res) => {
  const { usersId } = req.body;

  try {
    const users = await Users.findById(usersId);
    if (!users) {
      return res.status(404).json({ error: 'Elderly user not found' });
    }

    // Find pets that match availability and avoid allergies
    const matchingPets = await Pet.find({
      availability: { $in: users.availability.days },
      allergies: { $nin: users.interests }, // Ensuring no conflicts with user allergies
    });

    if (matchingPets.length === 0) {
      return res.status(404).json({ message: 'No suitable pets found at the moment' });
    }

    res.status(200).json({ matchingPets });
  } catch (err) {
    res.status(400).json({ error: 'Error matching pets with elderly', details: err });
  }
});

module.exports = router;

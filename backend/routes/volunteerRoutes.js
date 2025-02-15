const express = require('express');
const Volunteer = require('../models/Volunteer');
const Users = require('../models/Users');
const { areInterestsSimilar } = require('../helpers/interestMatcher');  // ✅ Import the helper function

const router = express.Router();

// Helper Function: Get Similar Interests
function getSimilarInterests(volunteerInterests, usersInterests) {
  const similarInterests = [];
  
  volunteerInterests.forEach(volunteerInterest => {
    usersInterests.forEach(usersInterest => {
      if (areInterestsSimilar(volunteerInterest, usersInterest)) {
        similarInterests.push({ volunteerInterest, usersInterest });
      }
    });
  });

  return similarInterests;
}

// Register a Volunteer
router.post('/register', async (req, res) => {
  const { name, age, gender, address, interests, skills, availability } = req.body;

  try {
    const volunteer = new Volunteer({ name, age, gender, address, interests, skills, availability });
    await volunteer.save();
    res.status(201).json({ message: 'Volunteer registered successfully!', volunteer });
  } catch (err) {
    res.status(400).json({ error: 'Error registering volunteer', details: err });
  }
});

// Match Volunteer with an Elderly User
router.post('/match', async (req, res) => {
  const { volunteerId, usersId } = req.body;

  try {
    const volunteer = await Volunteer.findById(volunteerId);
    const users = await Users.findById(usersId);

    if (!volunteer || !users) {
      return res.status(404).json({ error: 'User not found' });
    }

    const commonInterests = getSimilarInterests(volunteer.skills, users.interests);
    const matchScore = commonInterests.length / volunteer.skills.length;

    res.status(200).json({ matchScore, commonInterests });
  } catch (err) {
    res.status(400).json({ error: 'Error matching volunteer with elderly', details: err });
  }
});

module.exports = router;

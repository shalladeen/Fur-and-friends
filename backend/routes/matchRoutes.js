const express = require('express');
const axios = require('axios');
const Users = require('../models/Users');
const Volunteer = require('../models/Volunteer');

const router = express.Router();
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getDistance = async (origin, destination) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`;
  const response = await axios.get(url);
  
  if (response.data.status === "OK") {
    return response.data.rows[0].elements[0].distance.value; // Distance in meters
  } else {
    throw new Error("Could not calculate distance");
  }
};

router.get('/match', async (req, res) => {
  try {
    const users = await Users.find();
    const volunteers = await Volunteer.find();

    let matches = [];

    for (const user of users) {
      let bestMatch = null;
      let bestScore = Infinity;

      for (const volunteer of volunteers) {
        const distance = await getDistance(user.address, volunteer.address);
        const sharedInterests = user.interests.filter(i => volunteer.interests.includes(i)).length;

        const score = distance - (sharedInterests * 5000); // Adjust weight of interests

        if (score < bestScore) {
          bestScore = score;
          bestMatch = volunteer;
        }
      }

      matches.push({ user, bestMatch });
    }

    res.json({ matches });

  } catch (err) {
    console.error("Matching Error:", err);
    res.status(500).json({ error: 'Error finding matches', details: err.message });
  }
});

module.exports = router;

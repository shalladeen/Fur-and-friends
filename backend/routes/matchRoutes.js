const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const Users = require('../models/Users');
const OpenAI = require("openai");

// ✅ Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ AI Matching Route
router.get('/match-ai/:elderlyId', async (req, res) => {
  try {
    const { elderlyId } = req.params;
    const elderlyUser = await Users.findById(elderlyId);

    if (!elderlyUser) {
      return res.status(404).json({ message: 'Elderly user not found' });
    }

    // Fetch all volunteers
    const volunteers = await Volunteer.find();

    if (volunteers.length === 0) {
      return res.status(404).json({ message: 'No volunteers available' });
    }

    // ✅ Create AI Prompt
    const prompt = `
      You are an intelligent matching system for a volunteer program.
      An elderly user needs a volunteer based on interests and availability.

      **Elderly User Info**:
      - Name: ${elderlyUser.name}
      - Interests: ${elderlyUser.interests.join(", ") || "None specified"}
      - Availability: ${elderlyUser.availability.join(", ") || "No availability provided"}

      **Volunteers Available**:
      ${volunteers.map(vol => `
        - Name: ${vol.name}
        - Skills: ${vol.skills.join(", ") || "None"}
        - Availability: ${vol.availability.join(", ") || "No availability provided"}
      `).join("\n")}

      Who would be the best match for this elderly user and why? Provide only the volunteer's name and a brief reason.
    `;

    console.log("🔹 AI Prompt:\n", prompt);

    // ✅ Call OpenAI API
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      max_tokens: 150,
    });

    const aiResponse = response.choices[0].text.trim();
    console.log("✅ AI Match Found:", aiResponse);

    res.json({ match: aiResponse });
  } catch (error) {
    console.error("🚨 AI Matching Error:", error);
    res.status(500).json({ message: 'Error finding match', error: error.message });
  }
});

module.exports = router;

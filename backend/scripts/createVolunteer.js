const mongoose = require('mongoose');
const Volunteer = require('../models/Volunteer');
require('dotenv').config();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const createVolunteer = async () => {
  try {
    const existingVolunteer = await Volunteer.findOne({ email: "volunteer_demo@example.com" });
    if (existingVolunteer) {
      console.log("⚠ Volunteer already exists:", existingVolunteer);
      mongoose.connection.close();
      return;
    }

    const volunteer = new Volunteer({
      name: "Jane Smith",
      email: "volunteer_demo@example.com",
      password: "hashedpassword", // Placeholder
      role: "volunteer",
      age: 28,
      gender: "Female",
      address: "456 Oak St",
      skills: ["Cooking", "Technology Assistance", "Companionship"],
      interests: ["Book clubs", "Landscaping", "Puzzles"],
      availability: ["Monday", "Wednesday", "Friday"]
    });

    await volunteer.save();
    console.log("✅ Volunteer Created:", volunteer);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error creating volunteer:", error);
    mongoose.connection.close();
  }
};

createVolunteer();

const mongoose = require('mongoose');
const Users = require('../models/Users');
require('dotenv').config();

// ✅ Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const createElderlyUser = async () => {
  try {
    const existingUser = await Users.findOne({ email: "elderly_demo@example.com" });
    if (existingUser) {
      console.log("⚠ Elderly user already exists:", existingUser);
      mongoose.connection.close();
      return;
    }

    const elderlyUser = new Users({
      name: "John Demo",
      email: "elderly_demo@example.com",
      password: "hashedpassword", // Placeholder since you're not logging in
      role: "elderly",
      age: 72,
      gender: "Male",
      address: "123 Maple St",
      interests: ["Reading", "Gardening", "Chess"],
      availability: ["Monday", "Wednesday", "Friday"]
    });

    await elderlyUser.save();
    console.log("✅ Elderly User Created:", elderlyUser);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error creating elderly user:", error);
    mongoose.connection.close();
  }
};

// Run script
createElderlyUser();

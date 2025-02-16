const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }, // ✅ Ensure role is included
  age: { type: Number },
  gender: { type: String },
  address: { type: String },
  interests: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  availability: { type: [String], default: [] }
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);

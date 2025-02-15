const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['elderly', 'volunteer'], required: true },
  interests: [String],
  availability: [String], 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', UserSchema);

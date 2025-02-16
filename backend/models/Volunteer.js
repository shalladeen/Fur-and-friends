const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Ensure this is collected
    age: Number,
    gender: String,
    address: String,
    interests: [String],
    availability: [String],
    skills: [String],
    createdAt: { type: Date, default: Date.now }
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;

const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    address: String,
    interests: [String],
    availability: [String],
    skills: [String],
})

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;
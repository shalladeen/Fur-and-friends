const mongoose = require('mongoose');
const { Schema } = mongoose;

const volunteerSchema = new Scheme({
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
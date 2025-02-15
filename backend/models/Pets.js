const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  allergies: [String], // allergies pets may have (to filter)
  availability: [String], // When the pet is available for elderly
});

module.exports = mongoose.model('Pets', petSchema);

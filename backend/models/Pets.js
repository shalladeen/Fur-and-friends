const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new Schema({
  name: String,
  type: String,
  breed: String,
  allergies: [String], // allergies pets may have (to filter)
  availability: [String], // When the pet is available for elderly
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;

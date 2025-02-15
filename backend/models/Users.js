const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: { type: String, required: true },
  age: Number,
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['elderly', 'volunteer'], required: true },
  interests: [String],
  availability: [String], 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', UserSchema);
=======
  name: String,
  age: Number,
  email: String,
  interests: [String],
  availability: {
    days: [String],
    times: [String]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
>>>>>>> krishna

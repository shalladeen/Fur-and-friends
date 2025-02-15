const User = require('../models/User');

// Get all users
const getUsers = async () => {
  return await User.find();
};

// Create a new user
const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

// Delete a user
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = { getUsers, createUser, deleteUser };
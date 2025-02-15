const User = require('../models/User');

const getUsers = async (role = null) => {
  if (role) {
    return await User.find({ role });
  }
  return await User.find();
};

const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
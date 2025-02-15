const Users = require('../models/Users'); // ✅ Make sure this matches your model name

// ✅ Get all users (Optional: Filter by role)
const getUsers = async (role = null) => {
  if (role) {
    return await Users.find({ role });
  }
  return await Users.find();
};

// ✅ Create a new user (Ensure required fields are included)
const createUser = async (userData) => {
  if (!userData.name  !userData.email  !userData.role) {
    throw new Error("Missing required fields: name, email, role");
  }
  const newUser = new Users(userData);
  return await newUser.save();
};

// ✅ Update a user (Ensuring correct updates for array fields)
const updateUser = async (userId, updateData) => {
  return await Users.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
};

// ✅ Delete a user
const deleteUser = async (userId) => {
  return await Users.findByIdAndDelete(userId);
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
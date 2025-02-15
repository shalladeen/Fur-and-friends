const axios = require('axios');

const BASE_URL = 'http://localhost:5001';

// ✅ Test API root endpoint
const testRoot = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log('Root Endpoint Response:', response.data);
  } catch (error) {
    console.error('Root Endpoint Failed:', error.message);
  }
};

// ✅ Test getting users (Adjust route if needed)
const testGetUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Users`);
    console.log('✅ Users List:', response.data);
  } catch (error) {
    console.error('Users GET Failed:', error.message);
  }
};

// ✅ Run Tests
const runTests = async () => {
  console.log('🔍 Running API Tests...');
  await testRoot();
  await testGetUsers();
};

runTests();

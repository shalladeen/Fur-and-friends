const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

// Import Routes
const volunteerRoutes = require('./routes/volunteerRoutes');
const petRoutes = require('./routes/petRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/users', usersRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Fur and Friends API 🐾');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const volunteerRoutes = require('./routes/volunteerRoutes');
const petRoutes = require('./routes/petRoutes');
const usersRoutes = require('./routes/usersRoutes');

const User = require('./models/Users');
const Volunteer = require('./models/Volunteer');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await Volunteer.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "Password field missing, try resetting your password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const role = user.role || "volunteer";

    const token = jwt.sign(
      { id: user._id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: "Login successful", token, role });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.use('/api/volunteers', volunteerRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Fur and Friends API');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

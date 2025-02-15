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

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.post('/api/register', async (req, res) => {
    try {
      const { email, password, name, role } = req.body;
  
      console.log("Incoming Request Data:", req.body);
  
      // Check if email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists " });
  
      if (!password) return res.status(400).json({ message: "Password is required" });
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Save user with hashed password
      const newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();
  
      console.log(" User Registered Successfully:", newUser);
      res.json({ message: "User registered successfully " });
  
    } catch (error) {
      console.error(" Error in Registration:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      console.log("📩 Login Request Data:", req.body);
  
      const user = await User.findOne({ email });
  
      if (!user) {
        console.error("❌ User not found:", email);
        return res.status(400).json({ message: "User not found" });
      }
  
      if (!user.password) {
        console.error("⚠ User record is missing a password field:", user);
        return res.status(400).json({ message: "Password field missing, try resetting your password" });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        console.error("❌ Invalid password for user:", email);
        return res.status(400).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      console.log("✅ Login Successful for:", user.email);
      res.json({ message: "Login successful", token });
  
    } catch (error) {
      console.error("🚨 Error in Login:", error);
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

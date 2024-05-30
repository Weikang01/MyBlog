// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const secret = "your_jwt_secret"; // Replace with a secure secret

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).send({ error: "User registration failed", details: error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: "User login failed", details: error });
  }
});

module.exports = router;

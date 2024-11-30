const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashpassword });
    await user.save();
    res.status(201).json({ message: "Sign Up Successful" });
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: "User already exists" });
  }
});

// SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up first" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const { password: _, ...others } = user._doc; // Exclude password from response
    res.status(200).json({ user: others });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

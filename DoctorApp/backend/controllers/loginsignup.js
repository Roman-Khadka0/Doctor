const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config(); // to use environment variables

const User = require("../models/userData"); // Importing the User model
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual secret key

// Signup Controller
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const olduser = await User.findOne({ email });

    if (olduser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    // Included user data in the token payload
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: "5h" });

    return res.json({ status: "ok", data: token });
  }
  res.json({ status: "error", error: "Invalid Password" });
};

// Retrieving user data from token
const getUser = async (req, res) => {
  const token = req.body.token; // Extract token from request body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userid = decoded.id;
    const user = await User.findById(userid); 
    res.send({ status: "ok", data: user });
  } catch (error) {
    res.status(401).json({ error: "Siuu" });
  }
};

// Exporting the controllers
module.exports = { signup, login, getUser };
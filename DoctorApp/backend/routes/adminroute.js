const express = require("express");
const isAdmin = require("../middelwares/adminauth"); // Middleware to check if the user is an admin
const User = require("../models/userData");

const router = express.Router();

// Route to get all users
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json({ status: "ok", data: users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// Add more admin-specific routes here

module.exports = router;
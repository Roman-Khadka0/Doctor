const express = require("express");
const isAdmin = require("../middlewares/adminauth"); // Middleware to check if the user is an admin
const { deleteUser, getAppointments } = require("../controllers/adminController");
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

// Delete a user by ID
router.delete("/users/:id", isAdmin, deleteUser);

// Get all appointments
router.get("/appointments", getAppointments);

module.exports = router;
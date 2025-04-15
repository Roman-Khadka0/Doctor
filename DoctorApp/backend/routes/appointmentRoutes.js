const express = require("express");
const Appointment = require("../models/appointment");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Route to book an appointment
router.post("/book", authenticateUser, async (req, res) => {
  const { doctor, date, time, name, email, reason } = req.body;

  try {
    const appointment = new Appointment({
      userId: req.user.id,
      doctor,
      date,
      time,
      name,
      email,
      reason,
    });

    await appointment.save();
    res.json({ status: "ok", message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

// Route to fetch appointments for the logged-in user
router.get("/user", authenticateUser, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id });
    res.json({ status: "ok", data: appointments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

module.exports = router;
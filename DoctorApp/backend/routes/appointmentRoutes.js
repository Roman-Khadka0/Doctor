const express = require("express");
const {
  authenticateUser,
  bookAppointment,
  getUserAppointments,
} = require("../controllers/appointment");

const router = express.Router();

// Route to book an appointment
router.post("/book", authenticateUser, bookAppointment);

// Route to fetch appointments for the logged-in user
router.get("/user", authenticateUser, getUserAppointments);

module.exports = router;
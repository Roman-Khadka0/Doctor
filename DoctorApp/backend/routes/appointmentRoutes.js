const express = require("express");
const {
  authenticateUser,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  rescheduleAppointment,
} = require("../controllers/appointment");

const router = express.Router();

// Route to book an appointment
router.post("/book", authenticateUser, bookAppointment);

// Route to fetch appointments for the logged-in user
router.get("/user", authenticateUser, getUserAppointments);

// Route to cancel an appointment
router.patch("/cancel/:appointmentId", authenticateUser, cancelAppointment);

// Route to reschedule an appointment
router.patch("/reschedule/:appointmentId", authenticateUser, rescheduleAppointment);

module.exports = router;
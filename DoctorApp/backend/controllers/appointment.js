const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

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

// Controller to book an appointment
const bookAppointment = async (req, res) => {
  const { doctorId, date, reason } = req.body;

  try {
    // Check if the time is within 15 minutes from now
    const appointmentDate = new Date(date);
    const currentDate = new Date();

    // Calculate the time difference
    const timeDifference = appointmentDate - currentDate; // note: diffference is in milliseconds

    if (timeDifference < 15 * 60 * 1000) {
      return res.status(400).json({
        status: "error",
        error: "The appointment time must be at least 15 minutes from now.",
      });
    }

    // Check if the same doctor is already booked at the same time
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: appointmentDate,
    });

    if (existingAppointment) {
      return res.status(400).json({
        status: "error",
        error: "The doctor is already booked at the selected time. Please choose a different time.",
      });
    }

    // Check if the user already has an appointment at the same time
    const userExistingAppointment = await Appointment.findOne({
      userId: req.user.id,
      date: appointmentDate,
    });

    if (userExistingAppointment) {
      return res.status(400).json({
        status: "error",
        error: "You already have an appointment at the selected time. Please choose a different time.",
      });
    }

    // Fetch doctor details from the Doctor collection
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ status: "error", error: "Doctor not found." });
    }

    const appointment = new Appointment({
      userId: req.user.id, 
      doctorId, 
      date, 
      reason, 
    });

    await appointment.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.user.email, 
      subject: "Appointment Confirmation",
      html: `
        <h1>Appointment Confirmation</h1>
        <p>Dear ${req.user.name},</p>
        <p>Your appointment has been successfully booked with the following details:</p>
        <ul>
          <li><strong>Doctor Name:</strong> ${doctor.name}</li>
          <li><strong>Hospital:</strong> ${doctor.hospital}</li>
          <li><strong>Date:</strong> ${appointmentDate.toLocaleString()}</li>
          <li><strong>Reason:</strong> ${reason}</li>
        </ul>
        <p>Thank you for using our service!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ status: "ok", message: "Appointment booked successfully." });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ status: "error", error: "Failed to book appointment." });
  }
};

// Controller to fetch appointments for the logged-in user
const getUserAppointments = async (req, res) => {
  try {
    // Fetch all appointments for the user
    const appointments = await Appointment.find({ userId: req.user.id })
      .populate("doctorId", "name specialty hospital photo")
      .exec();

    // Update the status of appointments if the date has passed
    const currentDate = new Date();
    for (const appointment of appointments) {
      if (appointment.status === "Scheduled" && new Date(appointment.date) < currentDate) {
        appointment.status = "Completed";
        await appointment.save();
      }
    }

    // Filter appointments to only return those with "Scheduled" status
    const scheduledAppointments = appointments.filter((appointment) => appointment.status === "Scheduled");

    res.json({ status: "ok", scheduled: scheduledAppointments, all: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// Controller to cancel an appointment
const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId);
    const doctor = await Doctor.findById(appointment.doctorId);

    if (!doctor) {
      return res.status(404).json({ status: "error", error: "Doctor not found." });
    }

    if (!appointment) {
      return res.status(404).json({ status: "error", error: "Appointment not found." });
    }

    if (appointment.status !== "Scheduled") {
      return res.status(400).json({ status: "error", error: "Only scheduled appointments can be cancelled." });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.user.email, 
      subject: "Appointment Cancellation",
      html: `
        <h1>Appointment Cancellation</h1>
        <p>Dear ${req.user.name},</p>
        <p>Your appointment with the following details has been cancelled:</p>
        <ul>
          <li><strong>Doctor Name:</strong> ${doctor.name}</li>
          <li><strong>Hospital:</strong> ${doctor.hospital}</li>
          <li><strong>Date:</strong> ${appointment.date.toLocaleString()}</li>
          <li><strong>Reason:</strong> ${appointment.reason}</li>
        </ul>
        <p>We hope to assist you again in the future.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ status: "ok", message: "Appointment cancelled successfully." });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ status: "error", error: "Failed to cancel appointment." });
  }
};

module.exports = {
  authenticateUser,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
};
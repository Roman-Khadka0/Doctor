const express = require("express");
const { getDoctors, addDoctor, removeDoctor } = require("../controllers/doctorController");
const authenticateAdmin = require("../middlewares/auth"); // Middleware to ensure only admins can access
const upload = require("../utils/multer"); // Import multer configuration

const router = express.Router();

// Get all doctors
router.get("/", getDoctors);

// Add a new doctor (with photo upload)
router.post("/", authenticateAdmin, upload.single("photo"), addDoctor);

// Remove a doctor
router.delete("/:id", authenticateAdmin, removeDoctor);

module.exports = router;
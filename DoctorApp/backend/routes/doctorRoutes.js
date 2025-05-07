const express = require("express");
const { getDoctors, addDoctor, editDoctor, removeDoctor } = require("../controllers/doctorController");
const authenticateAdmin = require("../middlewares/auth"); // Middleware to ensure only admins can access
const upload = require("../utils/multer"); // Import multer configuration

const router = express.Router();

// Get all doctors
router.get("/", getDoctors);

// Add a new doctor (with photo upload)
router.post("/", authenticateAdmin, upload.single("photo"), addDoctor);

// Edit a doctor's information (with photo upload)
router.put("/:id", authenticateAdmin, upload.single("photo"), editDoctor);

// Remove a doctor
router.delete("/:id", authenticateAdmin, removeDoctor);

module.exports = router;
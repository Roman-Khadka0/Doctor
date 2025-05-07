const Doctor = require("../models/doctor");

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json({ status: "ok", data: doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

// Add a new doctor
const addDoctor = async (req, res) => {
  const { name, specialty, phone, rating, hospital, about } = req.body;
  const photo = req.file ? req.file.path : ""; // Get the uploaded photo URL

  if (!name || !specialty || !phone || !hospital || !about) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newDoctor = new Doctor({ name, photo, specialty, phone, rating, hospital, about });
    await newDoctor.save();
    res.json({ status: "ok", message: "Doctor added successfully", data: newDoctor });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ error: "Failed to add doctor" });
  }
};

// Edit a doctor's information
const editDoctor = async (req, res) => {
    const { id } = req.params;
    const { name, specialty, phone, rating, hospital, about } = req.body;
    const photo = req.file ? req.file.path : undefined; // Get the uploaded photo URL from Cloudinary
  
    try {
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        id,
        { name, photo, specialty, phone, rating, hospital, about },
        { new: true }
      );
  
      if (!updatedDoctor) {
        return res.status(404).json({ error: "Doctor not found" });
      }
  
      res.json({ status: "ok", message: "Doctor updated successfully", data: updatedDoctor });
    } catch (error) {
      console.error("Error updating doctor:", error);
      res.status(500).json({ error: "Failed to update doctor" });
    }
  };

// Remove a doctor
const removeDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.json({ status: "ok", message: "Doctor removed successfully" });
  } catch (error) {
    console.error("Error removing doctor:", error);
    res.status(500).json({ error: "Failed to remove doctor" });
  }
};

module.exports = { getDoctors, addDoctor, editDoctor, removeDoctor };
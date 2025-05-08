const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true }, // URL for the doctor's photo
  specialty: { type: String, required: true },
  phone: { type: String, required: true },
  rating: { type: Number, default: 0 },
  hospital: { type: String, required: true },
  about: { type: String, required: true },
}, { collection: "doctors" });

module.exports = mongoose.model("Doctor", DoctorSchema);
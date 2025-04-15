const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    reason: { type: String, required: true },
  },
  {
    collection: "appointments",
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
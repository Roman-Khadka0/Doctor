const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Scheduled", "Cancelled", "Completed"], required: true, default: "Scheduled" },
    reason: { type: String, required: true },
  },
  {
    collection: "appointments",
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
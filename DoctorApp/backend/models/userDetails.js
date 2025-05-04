const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to the User model
    phone: { type: String },
    gender: { type: String },
    dob: { type: Date },
    address: { type: String },
    bloodGroup: { type: String },
  },
  {
    collection: "userdetails",
    timestamps: true,
  }
);

module.exports = mongoose.model("UserDetails", UserDetailsSchema);
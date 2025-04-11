const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", UserDetailSchema);
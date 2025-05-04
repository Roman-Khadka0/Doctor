const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dzrbxikc8/image/upload/v1745256288/default-profile-account-unknown-icon-black-silhouette-free-vector_jbrjhz.jpg",
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", UserDetailSchema);
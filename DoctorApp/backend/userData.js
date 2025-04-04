const mongoose = require("mongoose");

const UserDetailScehma = new mongoose.Schema(
    {
        name: String,
        email: {type: String, unique: true},
        password: String
    },
    {
        collection: "users",
    }
);

mongoose.model("users", UserDetailScehma)
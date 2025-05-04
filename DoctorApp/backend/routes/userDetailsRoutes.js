const express = require("express");
const { getUserDetails, saveUserDetails } = require("../controllers/userDetails");
const authenticateUser = require("../middlewares/auth");
const upload = require("../utils/multer");

const router = express.Router();

// Route to get user details
router.get("/get", authenticateUser, getUserDetails);

// Route to save or update user details (with profile picture upload)
router.post("/set", authenticateUser, upload.single("profilePicture"), saveUserDetails);

module.exports = router;
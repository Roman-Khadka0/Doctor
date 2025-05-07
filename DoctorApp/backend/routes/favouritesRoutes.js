const express = require("express");
const { addFavorite, removeFavorite, getFavorites } = require("../controllers/favouritesController");
const authenticateUser = require("../middlewares/auth");

const router = express.Router();

// Route to get all favorite doctors
router.get("/", authenticateUser, getFavorites);

// Route to add a doctor to favorites
router.post("/add", authenticateUser, addFavorite);

// Route to remove a doctor from favorites
router.post("/remove", authenticateUser, removeFavorite);

module.exports = router;
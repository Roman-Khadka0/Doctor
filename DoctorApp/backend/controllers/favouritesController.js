const User = require("../models/userData");

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ status: "ok", data: user.favorites || [] });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

const addFavorite = async (req, res) => {
  const { doctor } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.favorites) {
      user.favorites = [];
    }

    // Check if the doctor is already in favorites
    if (user.favorites.some((fav) => fav._id === doctor._id)) {
      return res.status(400).json({ error: "Doctor is already in favorites" });
    }

    user.favorites.push(doctor);
    await user.save();
    res.json({ status: "ok", message: "Doctor added to favorites", data: user.favorites });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
};

const removeFavorite = async (req, res) => {
  const { doctor } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.favorites = user.favorites.filter((fav) => fav._id !== doctor._id);
    await user.save();
    res.json({ status: "ok", message: "Doctor removed from favorites", data: user.favorites });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
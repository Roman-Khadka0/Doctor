const User = require("../models/userData");
const Appointment = require("../models/appointment");

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ status: "ok", message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const getAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.find()
      .populate("userId", "name")
      .exec();
      res.json({ status: "ok", data: appointments });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  };

module.exports = { deleteUser, getAppointments };
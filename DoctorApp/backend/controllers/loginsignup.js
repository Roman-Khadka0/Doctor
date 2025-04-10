const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

require("dotenv").config(); // to use environment variables

const User = require("../models/userData"); // Importing the User model
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual secret key

// Signup Controller
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const olduser = await User.findOne({ email });

    if (olduser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    // Included user data in the token payload
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: "5h" });

    return res.json({ status: "ok", data: token });
  }
  res.json({ status: "error", error: "Invalid Password" });
};

// Retrieving user data from token
const getUser = async (req, res) => {
  const token = req.body.token; // Extract token from request body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userid = decoded.id;
    const user = await User.findById(userid); 
    return res.json({ status: "ok", data: user });
  } catch (error) {
    res.status(401).json({ error: "Siuu" });
  }
};


// Forgot Password Controller
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

    // Send the reset token via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="http://localhost:5173/resetPassword/${resetToken}">Reset Password</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ status: "ok", message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Reset Password Controller
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the reset token
    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(decoded.id, { password: encryptedPassword });

    res.json({ status: "ok", message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

// Exporting the controllers
module.exports = { signup, login, getUser, resetPassword, forgotPassword };
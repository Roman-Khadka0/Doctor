const express = require("express");
const { signup, login, getUser, forgotPassword, resetPassword } = require("../controllers/loginsignup");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/getuser", getUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword); 

module.exports = router;
const express = require("express");
const { signup, login, getUser } = require("../controllers/loginsignup");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/getuser", getUser);

module.exports = router;
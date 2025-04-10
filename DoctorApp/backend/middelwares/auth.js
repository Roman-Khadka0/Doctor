const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET; 

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET); // Decode the token
    req.user = verified; // Attach user data to the request object
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid Token" });
  }
};

module.exports = authenticateToken;
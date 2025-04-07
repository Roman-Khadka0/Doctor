const express = require("express");
const cors = require("cors");
const app = express();

// Allow specific origins (update with your frontend origins)
const allowedOrigins = ["http://localhost:5173", "http://localhost:5176"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // Allow the request if the origin is in the allowedOrigins list
        callback(null, true);
      } else {
        // Reject the request if the origin is not allowed
        callback(new Error("CORS not allowed"), false);
      }
    },
  })
);

// Parse incoming requests with JSON payloads
app.use(express.json());

// Define a simple route to send a message
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Set the port number for the server to listen on
const PORT = 5001;

// Start the server and log a message once it is running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//http://localhost:5001/api/message
const cors = require("cors"); // to connect frontend with backend at any origin
const express = require("express"); // to handle requests
const mongoose = require("mongoose"); // to connect to mongodb

const logsignroutes = require("./routes/loginsignuproute"); // importing the routes for login and signup
const adminRoutes = require("./routes/adminroute"); // importing the routes for admin

require("dotenv").config(); // to use environment variables


const app = express(); // creating an instance of express

// Parse incoming requests with JSON payloads and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors ({credentials: true}))
app.use( '/api/auth', logsignroutes); // using the routes for login and signup
app.use("/api/admin", adminRoutes); // Add admin routes

// Connection to the database
mongoose.connect(process.env.DB_URI)
.then(()=>{
  console.log("Connected to database.")
})
.catch((e) => console.log(e));


// Start the server and log a message once it is running
app.listen(process.env.PORT, () => {
  console.log(`Server running on port 5000`);
});
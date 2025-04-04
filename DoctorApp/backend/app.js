const cors = require("cors");

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken");
const JWT_SECRET = "hhjugg83487yhj78r()hhjasdfhehyu7y8u978hrfjefy>?{}hjgyu3yh[]huu8"; // secret token to verify sucessful login

const express = require("express");
const { MonitorOff } = require("lucide-react");
const app = express();

// Parse incoming requests with JSON payloads and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");

// URl to mongo DB database
const mongoUrl = "mongodb+srv://aayushk:Dm2Om09uB51VETsW@mycluster.rqu4coc.mongodb.net/easydoc?retryWrites=true&w=majority&appName=myCluster";


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

// Define a simple route to send a message
app.post("/api/message", (req, res) => {
  res.json({ message: "Hello from backend!" });
});


//http://localhost:5001/api/message

// Connection to the database
mongoose.connect(mongoUrl)
.then(()=>{
  console.log("Connected to database.")
})
.catch((e) => console.log(e));

require("./userData")


// Creating Signup API
const User = mongoose.model("users");
app.post("/signup", async(req,res)=>{
  const { name, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10)
  try {
    const olduser = await User.findOne({ email });

    if(olduser){
      return res.json({error:"User Exists"});
    }
    await User.create({
      name,
      email,
      password: encryptedPassword
    });
    res.send({status:"ok"});
  } catch (error) {
    res.send({status:"error"});
  }
})

// Creating Login API
app.post("/login", async(req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});
  if (!user){
    return res.json({ error: "User Not Found "});
  }
  if(await bcrypt.compare(password, user.password)){
    const token = jwt.sign({}, JWT_SECRET);

    if(res.status(201)){
      return res.json({status: "ok", data: token});
    } else {
      return res.json({ error: "error"});
    }
  }
  res.json({status : "error", error: "Invalid Password"});
});

// Start the server and log a message once it is running
app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
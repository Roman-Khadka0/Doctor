const bcrypt = require("bcryptjs") // to hash the password
const cors = require("cors"); // to connect frontend with backend at any origin
const express = require("express"); // to handle requests
const jwt = require("jsonwebtoken"); // to handle autentication
const mongoose = require("mongoose"); // to connect to mongodb

require("./userData")


const app = express();

const JWT_SECRET = "hhjugg83487yhj78r()hhjasdfhehyu7y8u978hrfjefy>?{}hjgyu3yh[]huu8"; // secret token to verify sucessful login

// Parse incoming requests with JSON payloads and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors ({credentials: true}))


// URl to mongo DB database
const mongoUrl = "mongodb+srv://aayushk:Dm2Om09uB51VETsW@mycluster.rqu4coc.mongodb.net/easydoc?retryWrites=true&w=majority&appName=myCluster";


// Define a simple route to send a message
app.post("/api/message", (req, res) => {
  res.json({ message: "Hello from backend!" });
});


// Connection to the database
mongoose.connect(mongoUrl)
.then(()=>{
  console.log("Connected to database.")
})
.catch((e) => console.log(e));


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
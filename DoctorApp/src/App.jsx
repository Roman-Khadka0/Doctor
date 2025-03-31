import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import Home from "./Component/Home";

function App() {
  const [message, setMessage] = useState(""); // Define state

  useEffect(() => {
    fetch("http://localhost:5001/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "test@example.com", password: "password123" }),
    })
    
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <p>Backend Message: {message}</p> {/* Display API message */}
    </Router>
  );
}

export default App;

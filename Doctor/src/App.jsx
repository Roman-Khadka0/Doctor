import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/login";
import SignUp from "./Component/SignUp";
import Home from "./Component/Home";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

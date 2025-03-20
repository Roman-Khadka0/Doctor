import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/login";
import Landing from "./Component/Landing"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="landing" element={<Landing />} />        
      </Routes>
    </Router>
  );
}

export default App;

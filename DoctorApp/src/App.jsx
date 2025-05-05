import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import Home from "./Component/Home";
import Dashboard from "./Component/Dashboard";
import Appointment from "./Component/Appointment";
import ForgotPassword from "./Component/ForgotPassword";
import ResetPassword from "./Component/ResetPassword";
import PProfile from "./Component/PProfile";
import AdminDashboard from "./Component/AdminDashboard";
import DocDash from "./Component/DocDash";
import HomeW from './Component/HomeW'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/PProfile" element={<PProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/docdash" element={<DocDash />} />
        <Route path="/HomeW" element={<HomeW />} />
      </Routes>
    </Router>
  );
}

export default App;

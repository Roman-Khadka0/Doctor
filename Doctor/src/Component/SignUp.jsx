import React, { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import Doctor from "../assets/Doctors.png";
import google from "../assets/google.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ name, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#B988C9]">
      <div className="flex w-[900px] bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Left Image */}
        <div className="w-2/2 bg-[#5A0078] p-0 flex flex-col justify-end items-center relative">
          <img src={Doctor} alt="Doctor" className="w-full h-auto" />
        </div>

        {/* Sign Up Form */}
        <div className="w-3/2 p-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center text-gray-700">Welcome!!</h2>
          <p className="text-center text-gray-500">Join us and start your journey!!</p>

          {/* Google Sign Up */}
          <button className="mt-4 flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            <img src={google} alt="Google" className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

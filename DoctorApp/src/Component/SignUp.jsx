import React, { useState } from "react";
import { Lock, Mail, User } from "lucide-react"; // Icons for input fields
import Doctor from "../assets/Doctors.png"; // Image used on the left side
import { Link } from "react-router-dom"; // For internal routing between login/signup

const SignUp = () => {
  // State variables to hold form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default page refresh behavior on form submit

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
    const passwordtest = passwordRegex.test(password);
    console.log(passwordtest, "passwordtest");
      if (!passwordtest) {
        alert("Please use more strong password.");
        return;
      }

    // Check if password and confirm password fields match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Log the entered data (for debugging)
    console.log({ name, email, password });

    // Make a POST request to your backend API to register the user
    fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Redirect to login page after successful signup
        window.location.href = "/login";
        console.log(data, "userRegister");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#4AA8B570]">
      <div className="flex w-[900px] bg-white rounded-xl overflow-hidden shadow-lg">
        
        {/* Left side image section */}
        <div className="w-2/2 bg-[#4AA8B5] p-0 flex flex-col justify-end items-center relative">
          <img src={Doctor} alt="Doctor" className="w-full h-auto" />
        </div>

        {/* Right side form section */}
        <div className="w-3/2 p-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center text-[#4AA8B5]">Welcome!!</h2>
          <p className="text-center text-gray">Join us and start your journey!!</p>

          {/* Link to login page */}
          <div className="mt-4 flex items-center justify-center text-white px-4 py-2 rounded-md bg-[#4AA8B5] hover:bg-[#4a7d84]">
            <Link to="/Login">
              <button>Login</button>
            </Link>
          </div>

          {/* Divider line */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Signup form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name Field */}
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-[#4AA8B5]"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-[#4AA8B5]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-[#4AA8B5]"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
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
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-[#4AA8B5]"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#4AA8B5] hover:bg-[#4a7d84] text-white"
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

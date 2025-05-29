import { useState } from "react";
import { Lock, Mail } from "lucide-react"; // Icons for email and password fields
import Black from "../assets/Black.png"; // Left side image
import { Link } from "react-router-dom"; // For navigation between components
import { jwtDecode } from "jwt-decode"; // Decode JWT token to get user role



const Login = () => {
  // State variables to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form reload

    console.log({ email, password }); // Log credentials for debugging

    // API request to the login endpoint
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          // Save token to local storage if login is successful
          localStorage.setItem("token", data.data);

          // Decode the JWT to extract user role
          const decoded = jwtDecode(data.data);

          // Redirect user based on their role
          if (decoded.role === "admin") {
            window.location.href = "/admin"; // Admin dashboard
          } else {
            window.location.href = "/home"; // Regular user dashboard
          }
        } else {
          // Show error message if login failed
          alert(data.error);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#4AA8B570]">
      <div className="flex w-[900px] bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Left Image Panel */}
        <div className="w-2/2 bg-[#4AA8B5] p-0 flex flex-col justify-end items-center relative">
          <img src={Black} alt="Doctor" className="w-full h-auto" />
        </div>

        {/* Login Form Section */}
        <div className="w-3/2 p-10 flex flex-col justify-center">
          {/* Greeting Header */}
          <h2 className="text-xl font-semibold text-center text-gray-700">Hello There!!</h2>
          <p className="text-center text-gray-500">Solution for your problem!!</p>
          <br />

          {/* SignUp Redirect Button */}
          <div>
            <h1 className="text-xl font-semibold text-center text-[#4AA8B5]">Lets Start</h1>
            <br />
            <Link to="/SignUp">
              <button type="button" className="w-full py-2 rounded-lg bg-[#4AA8B5] text-white hover:bg-[#416e74]">
                SignUp
              </button>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button type="submit" className="w-full py-2 rounded-lg bg-[#4AA8B5] text-white hover:bg-[#416e74]">
              Login
            </button>

            {/* Forgot Password Link */}
            <div className="text-center mt-3">
              <a href="/ForgotPassword" className="text-sm text-[#4AA8B5] hover:underline">
                Forgot password? Help is on your way!!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

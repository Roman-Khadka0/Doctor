import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";
import Black from "../assets/Black.png";
import google from "../assets/google.png";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#B988C9]">
      <div className="flex w-[900px] bg-white rounded-xl overflow-hidden shadow-lg">
        {/* left image*/}
        <div className="w-2/2 bg-[#5A0078] p-0 flex flex-col justify-end items-center relative">
          <img
            src={Black}
            alt="Doctor"
            className="w-full h-auto"
          />
        </div>

        {/*Login Form*/}
        <div className="w-3/2 p-10 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center text-gray-700">Hello There!!</h2>
          <p className="text-center text-gray-500">Solution for your problem!!</p>

          {/*Google*/}
          <button className="mt-4 flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            <img
              src={google}
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Log in with Google
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/*Login Form*/}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-10 py-2 focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="form-checkbox" 
                />
                <span>Remember me</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
            >
              Login
            </button>
            
            <div className="text-center mt-3">
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Forgot password? Help is on your way!!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landing;

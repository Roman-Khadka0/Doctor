import React from "react";

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-[#EAE7DD]">
      {/* Navbar */}
      <nav className="absolute top-0 w-full bg-[#99775C] shadow-md flex justify-between items-center p-4 md:px-12">
        <h1 className="text-xl font-bold">DoctIt</h1>
        <ul className="hidden md:flex space-x-6">
          <li className="hover:underline cursor-pointer">History</li>
          <li className="hover:underline cursor-pointer">Category</li>
          <li className="hover:underline cursor-pointer">Appointments</li>
          <li className="hover:underline cursor-pointer">Docters near my Locator</li>
          <li className="hover:underline cursor-pointer">Highest Rated</li>
        </ul>
        <button className="hidden md:block border px-4 py-2 rounded-md">Log in</button>
      </nav>

      <div className="relative flex items-center justify-center min-h-screen">
        <img
          src="/your-image-path.jpg"  
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative text-center text-[#99775C] bg-transparent bg-opacity-50 p-8 rounded-lg">
          <h2 className="text-lg md:text-xl font-semibold">FIND THE BEST SOLUTION TO YOUR PROBLEMS</h2>
          <h1 className="text-4xl md:text-6xl font-bold mt-2">Health before Wealth</h1>
          <button className="mt-6 bg-white text-black px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-300">
            Browse Doctors
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;

import React from 'react';
import { Link } from 'react-router-dom';
//+import { UserIcon } from '@heroicons/react/solid'; // or 'outline' depending on your UI
import logo from '../assets/logo.png'; // Adjust path as needed

const NavItem = ({ text }) => (
  <span className="text-white font-semibold hover:text-gray-300 cursor-pointer">
    {text}
  </span>
);

const user = {
  profilePic: 'https://via.placeholder.com/150', // Example placeholder
};

const PatientProfile = () => {
  return (
    <div className="flex flex-col bg-[#258C9B]">
      {/* HEADER SECTION */}
      <header className="py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <div className="mr-10">
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex space-x-10 text-xl">
              <NavItem text="Home" />
              <Link to="/dashboard"><NavItem text="Doctors" /></Link>
              <Link to="/appointment"><NavItem text="Appointments" /></Link>
            </nav>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4 text-lg">
            {user ? (
              <Link to="/profile">
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-300 transition"
                />
              </Link>
            ) : (
              <>
                <Link to="/Login">
                  <button className="flex items-center text-white font-semibold hover:text-gray-300">
                    <UserIcon className="w-4 h-4 mr-2" /> LOGIN
                  </button>
                </Link>
                <Link to="/SignUp">
                  <button className="border border-white text-white px-4 py-2 rounded-lg hover:text-gray-300 hover:border-gray-300">
                    SIGN UP
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* PROFILE SECTION */}
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Patient Info */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex-1">
            <div className="flex flex-col items-center text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Patient"
                className="w-28 h-28 rounded-full object-cover mb-4"
              />
              <h2 className="text-2xl font-bold">Roman Khadka</h2>
              <p className="text-gray-500">roman@example.com</p>
              <p className="mt-2 text-sm text-blue-600 font-medium">Blood Group: B+</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                Edit Info
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-md p-4">
              <h4 className="text-sm text-gray-400">Age</h4>
              <p className="text-xl font-semibold">29</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4">
              <h4 className="text-sm text-gray-400">Gender</h4>
              <p className="text-xl font-semibold">Male</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4">
              <h4 className="text-sm text-gray-400">Height</h4>
              <p className="text-xl font-semibold">5'9"</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4">
              <h4 className="text-sm text-gray-400">Weight</h4>
              <p className="text-xl font-semibold">75 kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

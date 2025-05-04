import React from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";

// ✅ Fix: define NavItem
const NavItem = ({ text }) => (
  <span className="cursor-pointer hover:text-gray-400 transition text-white">
    {text}
  </span>
);

const Header = ({ logo, user }) => {
  return (
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
            <Link to="/pprofile">
              <img
                src={user.avatar}
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
  );
};

export default Header;

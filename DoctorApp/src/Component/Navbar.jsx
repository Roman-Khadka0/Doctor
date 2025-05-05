import React from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";

// NavItem component
const NavItem = ({ text }) => (
  <span className="cursor-pointer hover:text-gray-400 transition text-white">
    {text}
  </span>
);

const Header = ({ logo, user = {} }) => {
  const fallbackAvatar = "https://via.placeholder.com/40?text=U"; // Replace with your preferred fallback

  return (
    <header className="py-4 bg-gray-800">
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
          <Link to="/pprofile">
            <img
              src={user?.avatar || fallbackAvatar}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-300 transition"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

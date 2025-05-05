import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// NavItem component
const NavItem = ({ text }) => (
  <span className="cursor-pointer hover:text-gray-400 transition text-white">
    {text}
  </span>
);

const Header = ({ logo, user = {}, handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const fallbackAvatar = "https://via.placeholder.com/40?text=U";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    if (handleLogout) handleLogout(); 
    localStorage.removeItem("token")
    navigate("/"); 
  };

  return (
    <header className="py-4 bg-[#4AA8B5] relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo */}
          <div className="mr-10">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex space-x-10 text-xl">
            <Link to="/home"><NavItem text="Home" /></Link>
            <Link to="/docdash"><NavItem text="Doctors" /></Link>
            <Link to="/appointment"><NavItem text="Appointments" /></Link>
          </nav>
        </div>

        {/* User Section */}
        <div className="relative" ref={dropdownRef}>
          <img
            src={user?.avatar || fallbackAvatar}
            alt="Profile"
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-300 cursor-pointer transition"
          />

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
              <Link
                to="/PProfile"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit Account
              </Link>
              <button
                onClick={handleLogoutClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

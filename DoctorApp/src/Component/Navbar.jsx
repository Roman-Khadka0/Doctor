import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// NavItem component
const NavItem = ({ text }) => (
  <span className="cursor-pointer hover:text-gray-400 transition text-white">
    {text}
  </span>
);

const Header = ({ logo, handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const fallbackAvatar = "https://res.cloudinary.com/dzrbxikc8/image/upload/v1745256288/default-profile-account-unknown-icon-black-silhouette-free-vector_jbrjhz.jpg"; // Replace with your preferred fallback

  // Close dropdown when clicking outside
  useEffect(() => {

    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User is not logged in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/userdetails/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        const data = await response.json();
        if (data.status === "ok") {
          setUser({
            name: data.data.name,
            avatar: data.data.profilePicture, // Fetch profile picture from the backend
          });
        } else {
          console.error("Failed to fetch user details:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();

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

  const NavItem = ({ text }) => (
  <span className="cursor-pointer text-white">
    {text}
  </span>
);

  return (
    <header className="py-4 bg-[#4AA8B5] relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Logo */}
          <div className="mr-10">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex space-x-10 text-xl ">
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
            className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-300 cursor-pointer transition object-fill"
          />

          {showDropdown && (
            <div className="absolut55e right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
              <Link
                to="/PProfile"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-  100"
              >
                Edit Account
              </Link>
              <Link
                to="/History"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                History
              </Link>
              {/* <Link
                to="/Records"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Records
              </Link> */}
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

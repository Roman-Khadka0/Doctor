import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// NavItem component
const NavItem = ({ text }) => (
  <span className="cursor-pointer hover:text-gray-400 transition text-white">
    {text}
  </span>
);

const Header = ({ logo }) => {
  const [user, setUser] = useState({});
  const fallbackAvatar = "https://via.placeholder.com/40?text=U"; // Replace with your preferred fallback

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
  }, []);

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
              src={user?.avatar || fallbackAvatar} // Use the profile picture or fallback
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

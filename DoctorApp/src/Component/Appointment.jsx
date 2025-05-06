import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Appointment = () => {
  const [bookedAppointments, setBookedAppointments] = useState([
    {
      id: 1,
      name: "Dr. Asha Sharma",
      specialty: "General physician",
      address: "Naxal",
      date: "25, April, 2025",
      time: "8:30 AM",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Dr. Hari Sapkota",
      specialty: "General physician",
      address: "Naxal",
      date: "25, April, 2025",
      time: "8:30 AM",
      image: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
      id: 3,
      name: "Dr. Jima Lahmu Sherpa",
      specialty: "General physician",
      address: "Naxal",
      date: "25, April, 2025",
      time: "8:30 AM",
      image: "https://randomuser.me/api/portraits/women/61.jpg"
    },
  ]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // State for History Modal
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Dummy user and avatar
  const user = { avatar: "https://randomuser.me/api/portraits/men/32.jpg" };
  const fallbackAvatar = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";

  const handleLogoutClick = () => {
    console.log("Logging out...");
    // Add logout logic here (e.g., clearing session and redirecting)
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCancel = (id) => {
    const updated = bookedAppointments.filter(app => app.id !== id);
    setBookedAppointments(updated);
  };

  return (
    <>
      {/* Custom Navbar */}
      <nav className="bg-[#4AA8B5] p-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Logo and Nav Links */}
          <div className="flex items-center space-x-12">
            <div className="flex-shrink-0">
              <img src={logo} alt="EasyDoc Logo" className="h-12 w-12 bg-[#00A9BD] p-2 rounded" />
            </div>
            <div className="hidden lg:flex space-x-8 text-xl">
              <Link to="/home" className="hover:text-gray-300">Home</Link>
              <Link to="/docdash" className="hover:text-gray-300">Doctors</Link>
              <Link to="/appointment" className="hover:text-gray-300">Appointments</Link>
            </div>
          </div>

          {/* Right: Avatar Dropdown */}
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
      </nav>

      {/* Appointments Section */}
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#258C9B]">APPOINTMENTS</h2>

            {/* Button for History and Records */}
            <button
              onClick={() => setShowHistory(true)} // Show History Modal on click
              className="border border-[#258C9B] text-[#258C9B] px-4 py-2 rounded-md font-medium hover:bg-[#258C9B] hover:text-white transition"
            >
              HISTORY AND RECORDS
            </button>
          </div>

          {bookedAppointments.length === 0 ? (
            <p className="text-center text-gray-500">No booked appointments.</p>
          ) : (
            bookedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white shadow-xl rounded-xl p-10 mb-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8"
              >
                <div className="flex items-center space-x-8 w-full">
                  <img
                    src={appointment.image}
                    alt={appointment.name}
                    className="w-32 h-32 object-cover rounded-md shadow"
                  />
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-[#333]">{appointment.name}</h3>
                    <p className="text-lg text-gray-700">{appointment.specialty}</p>
                    <p className="text-lg text-gray-700"><strong>Address:</strong> {appointment.address}</p>
                    <p className="text-lg text-gray-700"><strong>Date & Time:</strong> {appointment.date} | {appointment.time}</p>
                  </div>
                </div>

                <div className="text-center md:text-right space-y-4 w-full md:w-auto">
                  <div className="text-sm bg-green-100 text-green-700 px-4 py-2 rounded-full inline-block font-medium">
                    Booked
                  </div>
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    className="text-md text-red-600 border border-red-500 px-6 py-2 rounded-md hover:bg-red-500 hover:text-white transition font-semibold"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for History and Records */}
      {/* Modal for History and Records */}
{showHistory && (
  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white bg-opacity-20">
    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
      <h3 className="text-2xl font-bold mb-4 text-[#258C9B]">Previous Appointments</h3>
      {bookedAppointments.length > 0 ? (
        <ul className="space-y-4">
          {bookedAppointments.map((appt) => (
            <li key={appt.id} className="border-b pb-2">
              <p className="font-semibold">{appt.name}</p>
              <p className="text-sm text-gray-600">{appt.specialty}</p>
              <p className="text-sm text-gray-600">
                {appt.date} at {appt.time}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No previous records found.</p>
      )}
      <button
        onClick={() => setShowHistory(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
      >
        &times;
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default Appointment;

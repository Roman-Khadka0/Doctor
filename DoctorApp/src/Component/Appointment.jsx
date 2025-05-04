// Import necessary modules and assets
import { useState } from "react";
import Background from "../assets/background.png"; // Background image for page
import { Link } from "react-router-dom"; // Enables internal routing
import logo from "../assets/logo.png"; // App logo image

// Sample list of doctors with their specialties
const doctors = [
  { id: 1, name: "Dr. Aayush Sharma", specialty: "Cardiologist" },
  { id: 2, name: "Dr. Bina Thapa", specialty: "Dermatologist" },
  { id: 3, name: "Dr. Rajiv Koirala", specialty: "Pediatrician" },
];

// Appointment component definition
export default function Appointment() {
  // State to manage form input values
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    name: "",
    email: "",
    reason: "",
  });

  // State for dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // Handles input change and updates form state
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submit behavior
    console.log("Appointment Data:", formData); // Logs current form data

    // Check if user is logged in by checking token
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book an appointment.");
      window.location.href = "/login"; // Redirect to login if token not found
      return;
    }

    try {
      // Send appointment data to backend API
      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Include token in header for authentication
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      });

      const data = await response.json(); // Parse response

      // Check API response
      if (data.status === "ok") {
        alert("Appointment booked successfully!");
        // Reset form after success
        setFormData({
          doctor: "",
          date: "",
          time: "",
          name: "",
          email: "",
          reason: "",
        });
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        alert(data.error); // Show error if any
      }
    } catch (error) {
      console.error("Error booking appointment:", error); // Log error
    }
  };

  // Component render
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Header/Nav Bar */}
      <header className="py-4 w-full absolute top-0 left-0 bg-[#258C9B]">
        <div className="container mx-auto px-4 flex items-center justify-between text-white">
          {/* Left: Logo and Title */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="EasyDoc Logo" className="h-10 w-auto" />
            <div className="text-2xl font-bold">EASY DOC</div>
          </div>

          {/* Center Nav Links */}
          <nav className="space-x-6 text-lg">
            <Link to="/" className="hover:text-gray-300">
              HOME
            </Link>
            <Link to="/dashboard" className="hover:text-gray-300">
              DOCTORS
            </Link>
            <Link to="/appointment" className="hover:text-gray-300">
              APPOINTMENTS
            </Link>
          </nav>

          {/* Right: User Avatar + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none"
            >
              <img
                src="https://i.pravatar.cc/300"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                <Link
                  to="/PProfile"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Appointment form container */}
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl w-full max-w-2xl mt-20">
        <h1 className="text-3xl font-bold text-center text-[#258C9B] mb-6">
          Book a Doctor Appointment
        </h1>

        {/* Appointment form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Doctor selection dropdown */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Select Doctor</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name} - {doc.specialty}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Time fields */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-gray-700">Select Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-gray-700">Select Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
              />
            </div>
          </div>

          {/* Name input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Roman Khadka"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
            />
          </div>

          {/* Email input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Romann@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
            />
          </div>

          {/* Reason for visit */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Reason for Visit</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              placeholder="Short description"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#258C9B] text-white py-3 rounded-lg font-semibold hover:bg-[#1e6c78] transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

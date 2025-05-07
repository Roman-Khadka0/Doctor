import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

const AppointmentPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    name: "",
    email: "",
    reason: "",
  });

  const doctors = [
    { id: 1, name: "Dr. Smith", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Jane", specialty: "Dermatologist" },
    { id: 3, name: "Dr. Kumar", specialty: "Neurologist" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book an appointment.");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "ok") {
        alert("Appointment booked successfully!");
        setFormData({
          doctor: "",
          date: "",
          time: "",
          name: "",
          email: "",
          reason: "",
        });
        fetchAppointments(); // Refresh appointment list
        setShowForm(false);  // Hide form after booking
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.status === "ok") {
        setAppointments(data.appointments); // Make sure your backend returns `appointments`
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const [bookedAppointments, setBookedAppointments] = useState([
    {
      id: 1,
      name: "Dr. Asha Sharma",
      specialty: "General physician",
      address: "Naxal",
      date: "2025-04-25",
      time: "08:30",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Dr. Hari Sapkota",
      specialty: "General physician",
      address: "Naxal",
      date: "2025-04-25",
      time: "08:30",
      image: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
      id: 3,
      name: "Dr. Jima Lahmu Sherpa",
      specialty: "General physician",
      address: "Naxal",
      date: "2025-04-25",
      time: "08:30",
      image: "https://randomuser.me/api/portraits/women/61.jpg"
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-cover bg-center">
      {/* Header/Nav Bar */}
      <header className="py-4 w-full absolute top-0 left-0 bg-[#258C9B]">
        <div className="container mx-auto px-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="EasyDoc Logo" className="h-10 w-auto" />
            <div className="text-2xl font-bold">EASY DOC</div>
          </div>

          <nav className="space-x-6 text-lg">
            <Link to="/home" className="hover:text-gray-300">HOME</Link>
            <Link to="/dashboard" className="hover:text-gray-300">DOCTORS</Link>
            <Link to="/appointment" className="hover:text-gray-300">APPOINTMENTS</Link>
          </nav>

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

      {/* Toggle Button */}
      <div className="mt-24">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="border border-[#258C9B] text-[#258C9B] px-6 py-2 rounded-md font-medium hover:bg-[#258C9B] hover:text-white transition"
        >
          {showForm ? "Hide Appointment Form" : "Book an Appointment"}
        </button>
      </div>

      {/* Conditional Form */}
      {showForm && (
        <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl w-full max-w-2xl mt-10">
          <h1 className="text-3xl font-bold text-center text-[#258C9B] mb-6">
            Book a Doctor Appointment
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <button
              type="submit"
              className="w-full bg-[#258C9B] text-white py-3 rounded-lg font-semibold hover:bg-[#1e6c78] transition"
            >
              Book Appointment
            </button>
          </form>
        </div>
      )}

      {/* Booked Appointments Section */}
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
  );
};

export default AppointmentPage;

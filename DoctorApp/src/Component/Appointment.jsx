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

  const [showDropdown, setShowDropdown] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    name: "",
    specialty: "",
    address: "",
    date: "",
    time: "",
    image: ""
  });

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const user = { avatar: "https://randomuser.me/api/portraits/men/32.jpg" };
  const fallbackAvatar = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";

  const handleLogoutClick = () => {
    console.log("Logging out...");
    navigate("/login");
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const selectedDoctor = bookedAppointments.find(doc => doc.name === value);
      if (selectedDoctor) {
        setNewAppointment({
          ...newAppointment,
          name: value,
          specialty: selectedDoctor.specialty,
          address: selectedDoctor.address,
          image: selectedDoctor.image,
        });
        return;
      }
    }

    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const newId = bookedAppointments.length + 1;
    const appointmentToAdd = { ...newAppointment, id: newId };
    setBookedAppointments([...bookedAppointments, appointmentToAdd]);
    setNewAppointment({ name: "", specialty: "", address: "", date: "", time: "", image: "" });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#4AA8B5] p-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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

      {/* Main Page Content */}
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#258C9B]">APPOINTMENTS</h2>
            <button
              onClick={() => setShowHistory(true)}
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

          {/* Booking Form */}
          <div className="bg-white shadow-md rounded-xl p-8 mt-12">
            <h2 className="text-2xl font-bold mb-6 text-[#258C9B]">Book a New Appointment</h2>
            <form onSubmit={handleBookAppointment} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Doctor Dropdown */}
                <select
                  name="name"
                  value={newAppointment.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-4 py-2"
                >
                  <option value="" disabled>Select Doctor</option>
                  {bookedAppointments.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="specialty"
                  placeholder="Specialty"
                  value={newAppointment.specialty}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={newAppointment.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={newAppointment.image}
                  onChange={handleInputChange}
                  className="w-full border rounded px-4 py-2"
                />
                <input
                  type="date"
                  name="date"
                  value={newAppointment.date}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />
                <input
                  type="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-[#258C9B] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#1c6b75] transition"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* History Modal */}
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
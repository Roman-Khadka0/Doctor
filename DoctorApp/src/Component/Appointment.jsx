import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar"
import Logo from "../assets/Logo.png";

const AppointmentPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]); // State to store fetched doctors

  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    name: "",
    email: "",
    reason: "",
  });

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      if (data.status === "ok") {
        setDoctors(data.data); // Update doctors state with fetched data
      } else {
        console.error("Error fetching doctors:", data.error);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

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
        body: JSON.stringify({
          doctorId: formData.doctor, // Send doctorId instead of name
          date: `${formData.date}T${formData.time}`, // Combine date and time
          reason: formData.reason, // Reason for the appointment
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        alert("Appointment booked successfully!");
        setFormData({
          doctor: "",
          date: "",
          time: "",
          reason: "",
        });
        fetchAppointments(); // Refresh appointment list
        setShowForm(false); // Hide form after booking
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
      const response = await fetch("http://localhost:5000/api/appointments/user", {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.status === "ok") {
        setAppointments(data.scheduled); // Update appointments state with fetched data
      } else {
        console.error("Error fetching appointments:", data.error);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleCancel = async (appointmentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to cancel an appointment.");
      window.location.href = "/login";
      return;
    }

    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) {
      return; 
    }

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/cancel/${appointmentId}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();

      if (data.status === "ok") {
        alert("Appointment cancelled successfully!");
        fetchAppointments(); // Refresh the list of appointments
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors(); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar logo={Logo}  />

    <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-cover bg-center">
      {/* Header/Nav Bar */}

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
                  <option key={doc._id} value={doc._id}>
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
                  min={new Date().toISOString().split("T")[0]} // Disable past dates
                  max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]} // Disable dates more than 1 year in the future
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

      <br />

      {/* Booked Appointments Section */}
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No booked appointments.</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white shadow-xl rounded-xl p-10 mb-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8"
          >
            <div className="flex items-center space-x-8 w-full">
              <img
                src={appointment.doctorId.photo}
                alt={appointment.doctorId.name}
                className="w-32 h-32 object-cover rounded-md shadow"
              />
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-[#333]">{appointment.doctorId.name}</h3>
                <p className="text-lg text-gray-700">{appointment.doctorId.specialty}</p>
                <p className="text-lg text-gray-700"><strong>Hospital:</strong> {appointment.doctorId.hospital}</p>
                <p className="text-lg text-gray-700"><strong>Date:</strong> {new Date(appointment.date).toLocaleTimeString([], {
                          month: "long",
                          day: "2-digit",
                          weekday: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}</p>
              </div>
            </div>
            <div className="text-center md:text-right space-y-4 w-full md:w-auto">
              <div className="text-sm bg-green-100 text-green-700 px-4 py-2 rounded-full inline-block font-medium">
                {appointment.status}
              </div>
              <button
                onClick={() => handleCancel(appointment._id)}
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
  );
};

export default AppointmentPage;

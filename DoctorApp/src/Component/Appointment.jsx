import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Logo from "../assets/Logo.png";

const AppointmentPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const [rescheduleData, setRescheduleData] = useState({
    appointmentId: "",
    date: "",
    time: "",
    doctorName: "",
    hospitalName: "",
  });

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      if (data.status === "ok") setDoctors(data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/appointments/user", {
        headers: { Authorization: token },
      });
      const data = await response.json();
      if (data.status === "ok") setAppointments(data.scheduled);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          doctorId: formData.doctor,
          date: `${formData.date}T${formData.time}`,
          reason: formData.reason,
        }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        alert("Appointment booked successfully!");
        setFormData({ doctor: "", date: "", time: "", reason: "" });
        setShowForm(false);
        fetchAppointments();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  const handleCancel = async (appointmentId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/cancel/${appointmentId}`, {
        method: "PATCH",
        headers: { Authorization: token },
      });
      const data = await response.json();
      if (data.status === "ok") {
        alert("Appointment cancelled successfully!");
        fetchAppointments();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar logo={Logo} />

      <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-cover bg-center">
        <div className="mt-24">
          <button
            onClick={() => setShowForm(!showForm)}
            className="border border-[#258C9B] text-[#258C9B] px-6 py-2 rounded-md font-medium hover:bg-[#258C9B] hover:text-white"
          >
            {showForm ? "Hide Appointment Form" : "Book an Appointment"}
          </button>
        </div>

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
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
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
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
                  required
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Reason for Visit</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#258C9B] text-white py-3 rounded-lg font-semibold hover:bg-[#1e6c78]"
              >
                Book Appointment
              </button>
            </form>
          </div>
        )}

        <br />

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No booked appointments.</p>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white shadow-xl rounded-xl p-10 mb-10 flex flex-col md:flex-row items-center justify-between"
            >
              <div className="flex items-center space-x-8 w-full">
                <img
                  src={appointment.doctorId.photo}
                  alt={appointment.doctorId.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{appointment.doctorId.name}</h3>
                  <p>{appointment.doctorId.specialty}</p>
                  <p><strong>Hospital:</strong> {appointment.doctorId.hospital}</p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(appointment.date).toLocaleString(undefined, {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end space-y-3 mt-6 md:mt-0">
                <div className="text-sm bg-green-100 text-green-700 px-4 py-1 rounded-full">
                  {appointment.status}
                </div>
                <button
                  onClick={() => handleCancel(appointment._id)}
                  className="text-red-600 border border-red-500 px-6 py-2 rounded-md hover:bg-red-500 hover:text-white"
                >
                  Cancel Appointment
                </button>
                <button
                  onClick={() => {
                    setRescheduleData({
                      appointmentId: appointment._id,
                      date: "",
                      time: "",
                      doctorName: appointment.doctorId.name,
                      hospitalName: appointment.doctorId.hospital,
                    });
                    setShowRescheduleModal(true);
                  }}
                  className="text-green-600 border border-green-500 px-6 py-2 rounded-md hover:bg-green-500 hover:text-white"
                >
                  Reschedule Appointment
                </button>
              </div>
            </div>
          ))
        )}

         

  {/* Reschedule Modal Overlay */}
  {showRescheduleModal && (
  <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl">
      <h2 className="text-2xl font-bold text-[#258C9B] text-center mb-6">Reschedule Appointment</h2>

      {/* Doctor Photo */}
      <div className="flex justify-center mb-4">
        <img
          src={rescheduleData.doctorPhoto}
          alt={rescheduleData.doctorName}
          className="w-32 h-32 object-cover rounded-full border-4 border-[#258C9B]"
        />
      </div>

      {/* Doctor and Hospital Details */}
      <p className="text-center mb-2">
        <strong>Doctor:</strong> {rescheduleData.doctorName}
      </p>
      <p className="text-center mb-4">
        <strong>Hospital:</strong> {rescheduleData.hospitalName}
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const token = localStorage.getItem("token");

          try {
            const response = await fetch(
              `http://localhost:5000/api/appointments/reschedule/${rescheduleData.appointmentId}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify({
                  date: `${rescheduleData.date}T${rescheduleData.time}`,
                }),
              }
            );

            const data = await response.json();
            if (data.status === "ok") {
              alert("Appointment rescheduled successfully!");
              setShowRescheduleModal(false);
              fetchAppointments();
            } else {
              alert(data.error || "Failed to reschedule.");
            }
          } catch (error) {
            console.error("Error rescheduling:", error);
          }
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="date"
          value={rescheduleData.date}
          onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258C9B]"
          min={new Date().toISOString().split("T")[0]}
          required
        />

        <input
          type="time"
          value={rescheduleData.time}
          onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#258C9B]"
          required
        />

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => setShowRescheduleModal(false)}
            className="px-6 py-2 bg-gray-200 text-[#258C9B] rounded-md font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#258C9B] text-white rounded-md font-semibold hover:bg-[#1b6e7e]"
          >
            Reschedule
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default AppointmentPage;

import React, {useState, useEffect} from "react";
import Navbar from "../Component/Navbar";
import Logo from "../assets/Logo.png";

export default function DoctorAppointmentHistory() {
  const [appointments, setAppointments] = useState([]);

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
        setAppointments(data.all); // Update appointments state with fetched data
      } else {
        console.error("Error fetching appointments:", data.error);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#258C9B]">
      {/* Navbar */}
      <Navbar logo={Logo} />

      {/* Content */}
      <div className="p-6 max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Appointment History
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-gray-600 text-sm font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Time</th>
                <th className="px-6 py-3 text-left">Doctor</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {appointments.map((appointment, index) => (
                <tr
                  key={appointment._id}
                  className={`hover:bg-gray-50 transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">{new Date(appointment.date).toLocaleDateString([], {
                          month: "short",
                          day: "2-digit",
                          weekday: "short",
                        })}</td>
                  <td className="px-6 py-4">{new Date(appointment.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}</td>
                  <td className="px-6 py-4">{appointment.doctorId.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        appointment.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "Scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

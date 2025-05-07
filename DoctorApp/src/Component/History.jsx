import React from "react";
import Navbar from "../Component/Navbar";
import Logo from "../assets/Logo.png";

const appointments = [
  {
    id: 1,
    date: "2025-05-01",
    time: "10:30 AM",
    patient: "John Doe",
    doctor: "Dr. Smith",
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-04-28",
    time: "02:00 PM",
    patient: "Jane Roe",
    doctor: "Dr. Patel",
    status: "Cancelled",
  },
  {
    id: 3,
    date: "2025-04-20",
    time: "11:00 AM",
    patient: "Michael Scott",
    doctor: "Dr. Lee",
    status: "Completed",
  },
];

export default function DoctorAppointmentHistory() {
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
                <th className="px-6 py-3 text-left">Patient</th>
                <th className="px-6 py-3 text-left">Doctor</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {appointments.map((appt, index) => (
                <tr
                  key={appt.id}
                  className={`hover:bg-gray-50 transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">{appt.date}</td>
                  <td className="px-6 py-4">{appt.time}</td>
                  <td className="px-6 py-4">{appt.patient}</td>
                  <td className="px-6 py-4">{appt.doctor}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        appt.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {appt.status}
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

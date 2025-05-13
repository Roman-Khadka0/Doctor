import React from 'react';
import Navbar from '../Component/Navbar';
import Logo from '../assets/logo.png'; // Make sure the logo path is correct

// Dummy data for appointments
const appointments = [
  {
    id: 1,
    patientName: 'John Doe',
    date: '2025-05-01',
    time: '10:00 AM',
    doctor: 'Dr. Smith',
    status: 'Completed',
    blood_Group: 'B',
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    date: '2025-04-28',
    time: '2:30 PM',
    doctor: 'Dr. Emily',
    status: 'Cancelled',
    blood_Group: 'O+',
  },
  {
    id: 3,
    patientName: 'Michael Johnson',
    date: '2025-04-20',
    time: '11:00 AM',
    doctor: 'Dr. Alex',
    status: 'Completed',
    blood_Group: 'A',
  },
];

function Records() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar logo={Logo} />

      <div className="p-6 max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Records History
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6">Patient</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Time</th>
                <th className="py-3 px-6">Doctor</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Blood Group</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6">{appointment.patientName}</td>
                  <td className="py-3 px-6">{appointment.date}</td>
                  <td className="py-3 px-6">{appointment.time}</td>
                  <td className="py-3 px-6">{appointment.doctor}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        appointment.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-3 px-6">{appointment.blood_Group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Records;

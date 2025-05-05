import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [doctorSearch, setDoctorSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Access denied. Please log in as an admin.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/users1", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await response.json();
      if (data.status === "ok") {
        setUsers(data.data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filteredDoctors = users
    .filter((user) => user.role === "doctor")
    .filter(
      (user) =>
        user.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(doctorSearch.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7f9] to-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#258C9B] mb-8">Admin Dashboard</h1>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {/* Users Summary Card */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#258C9B]">👥 Users</h2>
              <a
                href="/admin/users"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#258C9B] underline hover:text-[#1e7683] transition"
              >
                See All
              </a>
            </div>
            <p className="text-4xl font-bold text-[#258C9B]">{users.length}</p>
            <p className="text-gray-600 mt-2">Total registered users</p>
          </div>

          {/* Doctors Card */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#258C9B]">🩺 Doctors</h2>
              <button className="bg-[#258C9B] text-white px-4 py-1 rounded-lg hover:bg-[#1e7683] transition">
                Add Doctor
              </button>
            </div>
            <input
              type="text"
              placeholder="🔍 Search doctors..."
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-[#258C9B] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#258C9B]"
            />
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-[#c4edf0] text-[#258C9B] text-left">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doc) => (
                      <tr key={doc._id} className="border-t hover:bg-gray-50 transition-all">
                        <td className="py-2 px-4">{doc.name}</td>
                        <td className="py-2 px-4">{doc.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4 text-gray-500">
                        No doctors found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-semibold text-[#258C9B] mb-4">📅 Appointments</h2>
            <p className="text-gray-600">This section will display appointment schedules and history.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

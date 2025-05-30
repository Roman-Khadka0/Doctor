import React, { useEffect, useRef, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    image: "",
    specialty: "",
    phone: "",
    about: "",
    rating: "",
    hospital: "",
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUsers();
    fetchDoctors();
    fetchAppointments();
  }, []);

  // Fetch users from backend API
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Access denied. Please log in as an admin.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
  
      const data = await response.json();
      if (data.status === "ok") {
        const filteredUsers = data.data.filter((user) => user.role === "user"); // Filter users with role 'user'
        setUsers(filteredUsers);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // handle what happens after delete user button is clicked
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
  
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
  
      const result = await response.json();
      if (result.status === "ok") {
        alert("User deleted successfully!");
        fetchUsers(); // Refresh the user list
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Filter users based on search input
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch doctors from backend API
  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      if (data.status === "ok") {
        setDoctors(data.data); // Use setDoctors to update the doctors state
      } else {
        console.error("Failed to fetch doctors:", data.error);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
        doctor.specialty?.toLowerCase().includes(doctorSearch.toLowerCase())
    );

  // Handle adding a new doctor
  const handleAddDoctor = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
  
    formData.append("name", newDoctor.name);
    formData.append("photo", newDoctor.photo); // Append the photo file
    formData.append("specialty", newDoctor.specialty);
    formData.append("phone", newDoctor.phone);
    formData.append("rating", newDoctor.rating || 0); // Default rating to 0 if not provided
    formData.append("hospital", newDoctor.hospital);
    formData.append("about", newDoctor.about);
  
    try {
      const response = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        headers: {
          Authorization: token, // Authorization header
        },
        body: formData, // Send FormData
      });
  
      const data = await response.json();
      if (data.status === "ok") {
        alert("Doctor added successfully!");
        setShowDoctorModal(false); // Close the modal
        setNewDoctor({
          name: "",
          photo: "",
          specialty: "",
          phone: "",
          rating: "",
          hospital: "",
          about: "",
        }); // Reset the form
        fetchDoctors(); // Refresh the doctor list
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDoctor({ ...newDoctor, photo: file }); // Store the file directly
    }
  };

  // Handle deleting a doctor
  const handleDeleteDoctor = async (doctorId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
  
      const data = await response.json();
      if (data.status === "ok") {
        alert("Doctor removed successfully!");
        fetchDoctors(); // Refresh the doctor list
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error removing doctor:", error);
    }
  };

  // Fetch appointments from backend API
  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/admin/appointments", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
  
      const data = await response.json();
      if (data.status === "ok") {
        setAppointments(data.data); // Set the list of appointments
      } else {
        console.error("Failed to fetch appointments:", data.error);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7f9] to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#258C9B]">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("token"); // Remove token from local storage
              window.location.href = "/login"; // Redirect to login page
            }}
            className="bg-[#258C9B] text-white px-4 py-2 rounded hover:bg-[#1e7683]"
          >
            Log Out
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {/* Users */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-semibold text-[#258C9B] mb-4">👥 Users</h2>
            <input
              type="text"
              placeholder="🔍 Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-[#258C9B] rounded-xl"
            />
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-[#c4edf0] text-[#258C9B]">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="border-t hover:bg-gray-50">
                        <td className="py-2 px-4">{user.name}</td>
                        <td className="py-2 px-4">{user.email}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Doctors */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#258C9B]">🩺 Doctors</h2>
              <button
                onClick={() => setShowDoctorModal(true)}
                className="bg-[#258C9B] text-white px-4 py-1 rounded hover:bg-[#1e7683]"
              >
                Add Doctor
              </button>
            </div>
            <input
              type="text"
              placeholder="🔍 Search doctors..."
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-[#258C9B] rounded-xl"
            />
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-[#c4edf0] text-[#258C9B]">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Specialty</th>
                    <th className="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doc) => (
                      <tr key={doc._id} className="border-t hover:bg-gray-50">
                        <td className="py-2 px-4">{doc.name}</td>
                        <td className="py-2 px-4">{doc.specialty || "N/A"}</td>
                        <td className="py-2 px-4">
                <button
                  onClick={() => handleDeleteDoctor(doc._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
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

            {/* Add Doctor Modal */}
            {showDoctorModal && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 w-full max-w-xl shadow-xl relative">
                  <h2 className="text-2xl font-bold mb-6 text-[#258C9B] text-center">Add New Doctor</h2>

                  <div className="flex flex-col items-center gap-5">
                    {/* Clickable image upload */}
                    <div className="relative">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div
                        onClick={() => fileInputRef.current.click()}
                        className="cursor-pointer"
                      >
                        {newDoctor.photo ? (
                          <img
                            src={URL.createObjectURL(newDoctor.photo)}
                            alt="Doctor"
                            className="h-24 w-24 rounded-full object-cover border-2 border-[#258C9B]"
                          />
                        ) : (
                          <div className="h-24 w-24 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 border-2 border-dashed border-[#258C9B]">
                            Upload
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Form */}
                    <div className="w-full space-y-4">
                      <input
                        type="text"
                        placeholder="Name"
                        value={newDoctor.name}
                        onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Specialty"
                        value={newDoctor.specialty}
                        onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Phone"
                        value={newDoctor.phone}
                        onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Rating"
                        value={newDoctor.rating}
                        onChange={(e) => setNewDoctor({ ...newDoctor, rating: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Hospital"
                        value={newDoctor.hospital}
                        onChange={(e) => setNewDoctor({ ...newDoctor, hospital: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                      />
                      <textarea
                        placeholder="About"
                        value={newDoctor.about}
                        onChange={(e) => setNewDoctor({ ...newDoctor, about: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded resize-none h-24"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end w-full gap-4 pt-4">
                      <button
                        onClick={() => setShowDoctorModal(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddDoctor}
                        className="px-4 py-2 bg-[#258C9B] text-white rounded hover:bg-[#1e7683]"
                      >
                        Add Doctor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Appointments Placeholder */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-semibold text-[#258C9B] mb-4">📅 Appointments</h2>
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-[#c4edf0] text-[#258C9B]">
                  <tr>
                    <th className="py-2 px-4">Patient</th>
                    <th className="py-2 px-4">Time</th>
                    <th className="py-2 px-4">Stauts</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={appointment._id} className="border-t hover:bg-gray-50">
                        <td className="py-2 px-4">{appointment.userId.name}</td>
                        <td className="py-2 px-4">{new Date(appointment.date).toLocaleDateString([], {
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}</td>
                        <td className="py-2 px-4">{appointment.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

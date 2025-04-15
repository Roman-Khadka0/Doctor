import { useState } from "react";
import Background from "../assets/background.png";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid"; // Assuming you're using Heroicons



export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Roman",
    email: "Roman@gmail.com",
    phone: "+977 9812345678",
    gender: "Male",
    dob: "1990-01-01",
    address: "Kathmandu, Nepal",
  });

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated!");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 "
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header className="py-4 w-full absolute top-0 left-0 bg-[#258C9B]">
  <div className="container mx-auto px-4 flex-center items-center justify-between">
    <div className="flex items-center">
      <div className="mr-10">
        <img src={Logo} alt="logo" className="h-12 w-12" />
      </div>
      <nav className="hidden lg:flex space-x-10 text-xl">
  <Link to="/" className="text-white hover:text-gray-300 font-semibold">Home</Link>
  <Link to="/dashboard" className="text-white hover:text-gray-300 font-semibold">Doctors</Link>
  <Link to="/appointment" className="text-white hover:text-gray-300 font-semibold">Appointments</Link>
</nav>

    </div>
  </div>
</header>

      <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg w-full max-w-3xl p-6 md:p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#258C9B]">
            Patient Profile
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-[#258C9B] text-white px-4 py-2 rounded-lg hover:bg-[#1e6c78] transition"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="2"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
                />
              </div>

              {isEditing && (
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-[#258C9B] text-white py-3 rounded-lg font-semibold hover:bg-[#1e6c78] transition"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

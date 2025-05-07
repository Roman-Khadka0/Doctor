import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import Navbar from "./Navbar"


const Profile = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    address: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile saved:", profile);
    // Add save logic here
  };

  return (
    <div className="bg-gray-100 min-h-screen">

    <Navbar logo={Logo}  />

    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4 w-full max-w-xl mx-auto"
    >
      <label
        htmlFor="profilePicture"
        className={`relative w-32 h-32 flex items-center justify-center rounded-full border-2 border-dashed border-teal-600 cursor-pointer ${
          isEditing ? "hover:bg-gray-100" : "cursor-not-allowed opacity-60"
        }`}
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-500">Upload</span>
        )}
        {isEditing && (
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        )}
      </label>

      <button
        type="button"
        onClick={() => setIsEditing((prev) => !prev)}
        className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        {isEditing ? "Disable Edit" : "Enable Edit"}
      </button>

      <div className="w-full">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
        />
      </div>

      <div className="w-full">
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

      <div className="w-full">
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

      <div className="w-full">
        <label className="block text-sm font-medium mb-1">Gender</label>
        <select
          name="gender"
          value={profile.gender}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="w-full">
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

      <div className="w-full">
        <label className="block text-sm font-medium mb-1">Blood Group</label>
        <select
          name="bloodGroup"
          value={profile.bloodGroup}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      <div className="w-full">
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
        <div className="w-full">
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
  );
};

export default Profile;

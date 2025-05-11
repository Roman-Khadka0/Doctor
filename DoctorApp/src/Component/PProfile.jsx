import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import Navbar from "./Navbar";

const Profile = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    bloodGroup: "",
    address: "",
    profilePicture: null, // Changed to null for file handling
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to view your profile.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/userdetails/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        const data = await response.json();
        if (data.status === "ok") {
          const dob = new Date(data.data.dob).toISOString().split("T")[0]; // Format as YYYY-MM-DD
          setProfile({
            name: data.data.name,
            email: data.data.email,
            phone: data.data.phone,
            gender: data.data.gender,
            dob: dob,
            address: data.data.address,
            bloodGroup: data.data.bloodGroup,
            profilePicture: data.data.profilePicture || null,
          });
          setPreviewImage(data.data.profilePicture); // Set the initial profile picture
        } else {
          console.error("Failed to fetch user details:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size should be less than 5MB");
        return;
      }

      setProfile((prev) => ({
        ...prev,
        profilePicture: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to update your profile.");
      window.location.href = "/login";
      return;
    }

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    formData.append("gender", profile.gender);
    formData.append("dob", profile.dob);
    formData.append("address", profile.address);
    formData.append("bloodGroup", profile.bloodGroup);
    
    // Only append profilePicture if it's a File object (new upload)
    if (profile.profilePicture instanceof File) {
      formData.append("profilePicture", profile.profilePicture);
    }

    try {
      const response = await fetch("http://localhost:5000/api/userdetails/set", {
        method: "POST",
        headers: {
          Authorization: token,
          // Don't set Content-Type header - let browser set it with boundary
        },
        body: formData,
      });

      const data = await response.json();
      if (data.status === "ok") {
        alert("Profile updated successfully!");
        setIsEditing(false);
        // Update preview image with the new one from server
        if (data.data.profilePicture) {
          setPreviewImage(
            data.data.profilePicture.startsWith("http")
              ? data.data.profilePicture
              : `http://localhost:5000/uploads/${data.data.profilePicture}`
          );
        }
      } else {
        alert(data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating profile");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
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
              <Link to="/home" className="text-white hover:text-gray-300 font-semibold">
                Home
              </Link>
              <Link to="/docdash" className="text-white hover:text-gray-300 font-semibold">
                Doctors
              </Link>
              <Link to="/appointment" className="text-white hover:text-gray-300 font-semibold">
                Appointments
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg w-full max-w-3xl p-6 md:p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#258C9B]">Patient Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-[#258C9B] text-white px-4 py-2 rounded-lg hover:bg-[#1e6c78] transition"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          <img
            src={previewImage || "https://res.cloudinary.com/dzrbxikc8/image/upload/v1745256288/default-profile-account-unknown-icon-black-silhouette-free-vector_jbrjhz.jpg"} // Display the preview or a default image
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
          <div className="flex-1 w-full"></div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
              />
            </div>

        {/* Edit/Cancel Button */}
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-2 bg-[#258C9B] text-white rounded-lg hover:bg-[#1e6c78] transition-colors"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>

        {/* Form Fields */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] focus:border-[#258C9B] disabled:bg-gray-100"
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] focus:border-[#258C9B] disabled:bg-gray-100"
            />
          </div>

          {/* Phone */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] focus:border-[#258C9B] disabled:bg-gray-100"
            />
          </div>

          {/* Gender */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] focus:border-[#258C9B] disabled:bg-gray-100"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                format="YYYY-MM-DD"
                max={new Date().toISOString().split("T")[0]} // Prevent future dates
                min="1900-01-01" // Prevent dates before 1900
                value={profile.dob}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
              />
            </div>

          {/* Blood Group */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={profile.bloodGroup}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] focus:border-[#258C9B] disabled:bg-gray-100"
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

          {/* Address */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!isEditing}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] focus:border-[#258C9B] disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="w-full pt-4">
            <button
              type="submit"
              className="w-full bg-[#258C9B] text-white py-3 rounded-lg font-semibold hover:bg-[#1e6c78] transition-colors"
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
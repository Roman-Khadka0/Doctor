import { useState, useEffect } from "react";
import Background from "../assets/background.png";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    profilePicture: "",
    bloodGroup: "",
  });
  const [previewImage, setPreviewImage] = useState(""); // State to store the preview of the uploaded image

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to view your profile.");
        window.location.href = "/login";
        return;
      }

      try {
        // Fetch user details from the backend
        const response = await fetch("http://localhost:5000/api/userdetails/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        const data = await response.json();
        if (data.status === "ok") {
          setProfile({
            name: data.data.name,
            email: data.data.email,
            phone: data.data.phone,
            gender: data.data.gender,
            dob: data.data.dob,
            address: data.data.address,
            // profilePicture: data.data.profilePicture,
            bloodGroup: data.data.bloodGroup,
          });
          console.log(data.data.profilePicture);
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

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        profilePicture: file, // Store the file in the state
      }));
      setPreviewImage(URL.createObjectURL(file)); // Generate a preview URL for the uploaded image
    }
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
    if (profile.profilePicture && typeof profile.profilePicture !== "string") {
      formData.append("profilePicture", profile.profilePicture); // Append the file only if it's newly selected
    }

    try {
      const response = await fetch("http://localhost:5000/api/userdetails/set", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData, // Send FormData
      });

      const data = await response.json();
      if (data.status === "ok") {
        alert("Profile updated successfully!");
        setIsEditing(false);
        setPreviewImage(data.data.profilePicture); // Update the preview with the saved image
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
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
              <Link to="/" className="text-white hover:text-gray-300 font-semibold">
                Home
              </Link>
              <Link to="/dashboard" className="text-white hover:text-gray-300 font-semibold">
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

            <div>
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
                value={profile.dob}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B] disabled:bg-gray-100"
              />
            </div>

            <div>
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
  );
}
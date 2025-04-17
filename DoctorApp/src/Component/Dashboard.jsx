import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Doctor1 from "../assets/Doctor1.jpg";
import Doctor2 from "../assets/Doctor2.jpg";
import Doctor4 from "../assets/Doctor4.jpg";
import Dope from "../assets/Dope.jpg";

const doctors = [
  {
    name: "Dr. Jane Smith",
    specialty: "Cardiologist",
    hospital: "Norvic Hospital",
    rating: 4.5,
    image: Doctor1,
  },
  {
    name: "Dr. Max Healey",
    specialty: "Neurologist",
    hospital: "Summit View Hospital",
    rating: 5.0,
    image: Doctor2,
  },
  {
    name: "Dr. Ivana Cure",
    specialty: "Pediatrician",
    hospital: "Riverside Wellness Hospital",
    rating: 4.5,
    image: Dope,
  },
];

const initialFavorites = [
  {
    name: "Dr. Payne Reliever",
    specialty: "Psychiatrist",
    hospital: "NovaCare Specialty Hospital",
    rating: 5.0,
    image: Doctor4,
    isFav: true,
  },
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [favorites, setFavorites] = useState(initialFavorites);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/getUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (data.status === "ok") {
          setUser(data.data);
        } else {
          console.error("Failed to fetch user data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/appointments/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        const data = await response.json();
        if (data.status === "ok") {
          setAppointments(data.data);
        } else {
          console.error("Failed to fetch appointments:", data.error);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchUserData();
    fetchAppointments();
  }, []);

  const toggleFavorite = (index) => {
    setFavorites((prevFavs) =>
      prevFavs.map((fav, i) =>
        i === index ? { ...fav, isFav: !fav.isFav } : fav
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#258C9B] p-4 flex justify-between items-center text-white">
        <div className="text-2xl font-bold">EASY DOC</div>
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-300">HOME</Link>
          <Link to="/dashboard" className="hover:text-gray-300">DOCTORS</Link>
          <Link to="/appointment" className="hover:text-gray-300">APPOINTMENTS</Link>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none"
          >
            <img
              src="https://i.pravatar.cc/300" // Replace with user's profile image if available
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Welcome */}
      <div className="p-6 text-xl font-semibold">Welcome! {user ? user.name : "Loading..."}</div>

      {/* Upcoming Appointments */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">🗓️ Upcoming Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-600">No upcoming appointments found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg p-5 transition transform hover:scale-[1.02]"
              >
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-3">
                    🩺
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Dr. {appointment.doctor}
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <span className="mr-2 text-blue-500">📅</span>
                    <span>
                      <strong>Date:</strong>{" "}
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-green-500">⏰</span>
                    <span>
                      <strong>Time:</strong> {appointment.time}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2 text-red-400">📝</span>
                    <span>
                      <strong>Reason:</strong> {appointment.reason}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Top Doctors */}
      <section className="p-6">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">Top Doctors</h2>
          <Link to="/doctors" className="text-blue-500">See All</Link>
        </div>
        <div className="flex space-x-4 mt-4">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md w-1/3">
              <img src={doctor.image} alt={doctor.name} className="rounded-md" />
              <h3 className="font-semibold mt-2">{doctor.name}</h3>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
              <p className="text-sm font-bold">{doctor.hospital}</p>
              <p className="text-yellow-500">⭐ {doctor.rating}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Favorites */}
      <section className="p-6">
        <h2 className="text-lg font-bold">Favorites</h2>
        <div className="flex space-x-4 mt-4">
          {favorites.map((doctor, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md w-1/3 flex items-center">
              <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-md" />
              <div className="ml-4">
                <h3 className="font-semibold">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <p className="text-sm font-bold">{doctor.hospital}</p>
                <p className="text-yellow-500">⭐ {doctor.rating}</p>
              </div>
              <button
                onClick={() => toggleFavorite(index)}
                className="ml-auto text-2xl focus:outline-none"
                aria-label="Toggle favorite"
              >
                {doctor.isFav ? (
                  <span className="text-red-500">❤️</span>
                ) : (
                  <span className="text-gray-400">🤍</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

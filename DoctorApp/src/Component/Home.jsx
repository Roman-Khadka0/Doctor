import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo.png";
import Navbar from "../Component/Navbar";

function Landing() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [doctors, setDoctors] = useState([]); // State to store doctors fetched from the backend

  const displayedDoctors = doctors
  .sort((a, b) => b.rating - a.rating) // Sort doctors by rating in descending order
  .slice(0, 3); // Take the top 3 doctors

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        window.location.href = "/login";
        return;
      }

      // Decode the token to check its expiry
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decoded.exp < currentTime) {
          console.error("Token has expired");
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
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
          setAppointments(data.data); // Set only upcoming appointments
        } else {
          console.error("Failed to fetch appointments:", data.error);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/favorites", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        const data = await response.json();
        if (data.status === "ok") {
          setFavorites(data.data); // Set favorites from the backend
        } else {
          console.error("Failed to fetch favorites:", data.error);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors"); // Replace with your backend URL
        const data = await response.json();
        if (data.status === "ok") {
          setDoctors(data.data); // Update the state with fetched doctors
        } else {
          console.error("Failed to fetch doctors:", data.error);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchFavorites();
    fetchUserData();
    fetchAppointments();
    fetchDoctors(); // Fetch doctors from the backend
  }, []);

  const handleFavoriteClick = async (doctor) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      if (favorites.some((fav) => fav._id === doctor._id)) {
        // Remove from favorites
        const response = await fetch("http://localhost:5000/api/favorites/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ doctor }),
        });

        const data = await response.json();
        if (data.status === "ok") {
          setFavorites(data.data); // Update favorites from the backend
        } else {
          console.error("Failed to remove favorite:", data.error);
        }
      } else {
        // Add to favorites
        const response = await fetch("http://localhost:5000/api/favorites/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ doctor }),
        });

        const data = await response.json();
        if (data.status === "ok") {
          setFavorites(data.data); // Update favorites from the backend
        } else {
          console.error("Failed to add favorite:", data.error);
        }
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const isFavorite = (doctor) => favorites.some((fav) => fav && fav._id === doctor._id);

  return (
    <div className="flex flex-col bg-[#258C9B]">
      {/* HEADER SECTION */}
      <Navbar logo={logo} />

      <section className="bg-white py-16 px-6">
        {/* Welcome */}
        <div className="p-6 text-xl font-semibold">Welcome! {user ? user.name : "Loading..."}</div>

        {/* Upcoming Appointments */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#258C9B] mb-4">Upcoming Appointments</h2>
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
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-3">🩺</div>
                    <h3 className="font-semibold text-lg text-gray-800">{appointment.doctor}</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <span className="mr-2 text-blue-500">📅</span>
                      <span>
                        <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString([], {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          weekday: "short",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-green-500">⏰</span>
                      <span>
                        <strong>Time:</strong> {new Date(appointment.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2 text-red-400">🏥</span>
                      <span>
                        <strong>Hospital:</strong> {appointment.doctorId.hospital}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Doctors */}
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#258C9B]">Top Doctors</h2>
            <button
              onClick={() => window.location.href = "/docdash"}
              className="text-[#258C9B] font-semibold hover:underline"
            >
              See All
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {displayedDoctors.map((doctor) => (
              <div key={doctor._id} className="bg-white p-6 rounded-lg border border-[#bce1e3] shadow text-center">
                <img
                  src={doctor.photo || "https://via.placeholder.com/100?text=👨‍⚕️"}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-xl mx-auto object-cover mb-4"
                />
                <h4 className="text-lg font-semibold text-[#258C9B]">{doctor.name}</h4>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <button
                  onClick={() => handleFavoriteClick(doctor)}
                  className={`mt-4 ${isFavorite(doctor) ? "text-red-500" : "text-[#258C9B]"}`}
                >
                  <FontAwesomeIcon icon={isFavorite(doctor) ? faHeartBroken : faHeart} className="mr-2" />
                  {isFavorite(doctor) ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Favourites */}
        <div>
          <h2 className="text-3xl font-bold text-[#258C9B] mb-6">Your Favourites</h2>
          {favorites.length === 0 ? (
            <p className="text-gray-600">You have no favorite doctors yet. Add some to see them here!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((fav) => (
                <div
                  key={fav._id}
                  className="bg-[#f9f9f9] p-6 rounded-lg border border-[#bce1e3] shadow flex items-center gap-4"
                >
                  <img
                    src={fav.photo || "https://via.placeholder.com/100?text=👨‍⚕️"}
                    alt={fav.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-[#258C9B]">{fav.name}</h4>
                    <p className="text-sm text-gray-700">{fav.specialty}</p>
                    <button
                      onClick={() => handleFavoriteClick(fav)}
                      className="text-red-500 font-semibold hover:underline mt-2"
                    >
                      <FontAwesomeIcon icon={faHeartBroken} className="mr-2" />
                      Remove from Favorites
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Landing;
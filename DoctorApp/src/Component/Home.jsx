import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'; // Add the heart icons
import logo from "../assets/Logo.png";
import Navbar from "../Component/Navbar";

function Landing() {
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const doctors = [
    { name: "Dr. Asha Sharma", specialty: "Pediatrician", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Dr. Bijay Thapa", specialty: "Cardiologist", image: "https://randomuser.me/api/portraits/men/52.jpg" },
    { name: "Dr. Pooja KC", specialty: "Dermatologist", image: "https://randomuser.me/api/portraits/women/33.jpg" },
    { name: "Dr. Nirajan Karki", specialty: "Orthopedic", image: "https://randomuser.me/api/portraits/men/41.jpg" },
    { name: "Dr. Sita Maharjan", specialty: "Gynecologist", image: "https://randomuser.me/api/portraits/women/61.jpg" },
    { name: "Dr. Prakash Shrestha", specialty: "ENT Specialist", image: "https://randomuser.me/api/portraits/men/66.jpg" },
  ];

  const displayedDoctors = showAllDoctors ? doctors : doctors.slice(0, 3); // Show only the first 3 doctors when 'showAllDoctors' is false

  const handleFavoriteClick = (doctor) => {
    if (favorites.some((fav) => fav.name === doctor.name)) {
      // Remove from favorites
      setFavorites(favorites.filter((fav) => fav.name !== doctor.name));
    } else {
      // Add to favorites
      setFavorites([...favorites, doctor]);
    }
  };

  const isFavorite = (doctor) => favorites.some((fav) => fav.name === doctor.name);

  return (
    <div className="flex flex-col bg-[#258C9B]">
      {/* HEADER SECTION */}
      <Navbar logo={logo}  />

      <section className="bg-white py-16 px-6">
        {/* Upcoming Appointments */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#258C9B] mb-4">Upcoming Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[ 
              {
                doctor: "Dr. Nisha Thapa",
                time: "May 6, 2025 - 10:30 AM",
                type: "General Checkup",
                image: "https://randomuser.me/api/portraits/women/65.jpg",
              },
              {
                doctor: "Dr. Suman Basnet",
                time: "May 7, 2025 - 2:00 PM",
                type: "Dental Cleaning",
                image: "https://randomuser.me/api/portraits/men/43.jpg",
              },
              {
                doctor: "Dr. Rajiv Khadka",
                time: "May 8, 2025 - 4:00 PM",
                type: "Eye Exam",
                image: "https://randomuser.me/api/portraits/men/52.jpg",
              },
            ].map((appt, idx) => (
              <div key={idx} className="bg-[#f1fafa] p-6 rounded-xl shadow-md flex items-center gap-4">
                <img src={appt.image} alt={appt.doctor} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="text-xl font-semibold text-[#258C9B]">{appt.doctor}</h3>
                  <p className="text-gray-700">{appt.type}</p>
                  <p className="text-gray-600 text-sm">{appt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Doctors */}
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#258C9B]">Top Doctors</h2>
            <button
              onClick={() => setShowAllDoctors(!showAllDoctors)}
              className="text-[#258C9B] font-semibold hover:underline"
            >
              {showAllDoctors ? "Show Less" : "See All"}
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {displayedDoctors.map((doctor, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-[#bce1e3] shadow text-center">
                <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-xl mx-auto object-cover mb-4" />
                <h4 className="text-lg font-semibold text-[#258C9B]">{doctor.name}</h4>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <button
                  onClick={() => handleFavoriteClick(doctor)}
                  className={`mt-4 ${isFavorite(doctor) ? 'text-red-500' : 'text-[#258C9B]'}`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav, idx) => (
              <div key={idx} className="bg-[#f9f9f9] p-6 rounded-lg border border-[#bce1e3] shadow flex items-center gap-4">
                <img src={fav.image} alt={fav.name} className="w-16 h-16 rounded-full object-cover" />
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
        </div>
      </section>
    </div>
  );
}

export default Landing;

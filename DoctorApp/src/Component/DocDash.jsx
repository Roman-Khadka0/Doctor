import { useState, useEffect } from 'react';
import { Heart, HeartOff, Star } from 'lucide-react';
import Navbar from '../Component/Navbar';
import Logo from '../assets/Logo.png';

export default function DocDash() {
  const [favorites, setFavorites] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [sortBy, setSortBy] = useState(''); // State to store sorting criteria
  const [searchTerm, setSearchTerm] = useState(''); // State to store search input

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctors'); // Replace with your backend URL
        const data = await response.json();
        if (data.status === 'ok') {
          setAllDoctors(data.data); // Update the state with fetched doctors
        } else {
          console.error('Failed to fetch doctors:', data.error);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
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

    fetchDoctors();
    fetchFavorites();
  }, []);

  // Combine search and sorting logic
  const sortedDoctors = [...allDoctors]
    .filter((doc) => {
      // Filter by search term
      return doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === 'rating') {
        return b.rating - a.rating; // Sort by rating in descending order
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name); // Sort alphabetically by name
      } else if (sortBy === 'specialty') {
        return a.specialty.localeCompare(b.specialty); // Sort alphabetically by specialty
      }
      return 0; // No sorting
    });

  const toggleFavorite = async (doctor) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      if (favorites && favorites.some((fav) => fav._id === doctor._id)) {
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

  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closePopup = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar logo={Logo} />

      <div className="px-6 py-4">
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2 md:mb-0">DOCTORS</h2>
          <input
            type="text"
            placeholder="Search Doctor ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:max-w-md px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center">
          <h3 className="text-lg font-medium text-teal-600">Sort By:</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 focus:outline-none"
          >
            <option value="">None</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
            <option value="specialty">Specialty</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {sortedDoctors.map((doc) => (
            <div
              key={doc._id}
              className="relative bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all aspect-square flex flex-col justify-between cursor-pointer"
              onClick={() => handleCardClick(doc)}
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(doc);
                }}
                aria-label="Toggle Favorite"
              >
                {favorites.some((fav) => fav._id === doc._id)
                  ? <Heart fill="red" color="red" size={20} />
                  : <HeartOff size={20} />}
              </button>

              <div className="w-full aspect-square bg-blue-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://via.placeholder.com/100?text=👨‍⚕️';
                  }}
                />
              </div>

              <div>
                <p className="font-semibold text-gray-700">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.title}</p>
              </div>
            </div>
          ))}
        </div>

        {sortedDoctors.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No doctors found.</p>
        )}
      </div>

      {selectedDoctor && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.84)' }}
        >
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full mx-4 relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-black hover:text-black"
              style={{ color: 'black' }}
              onClick={closePopup}
            >
              ✖
            </button>

            <div className="flex gap-6">
              <div className="w-full aspect-square">
                <img
                  src={selectedDoctor.photo}
                  alt={selectedDoctor.name}
                  className="rounded-lg object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://via.placeholder.com/100?text=👨‍⚕️';
                  }}
                />
              </div>

              <div className="w-full aspect-square flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {selectedDoctor.name}
                  </h2>
                  <p className="text-base text-gray-600 mt-2">
                    {selectedDoctor.specialty}
                  </p>

                  <div className="mt-4 text-gray-800 text-base space-y-2">
                    <p className="font-medium">📞 {selectedDoctor.phone}</p>
                    <p>
                      {selectedDoctor.about}
                    </p>
                  </div>
                </div>

                <div className="mt-1 flex justify-between items-center text-base text-gray-800">
                  <p>
                    Hospital: <span className="font-semibold text-black">{selectedDoctor.hospital}</span>
                  </p>

                  <div className="flex items-center text-yellow-500 font-semibold">
                    {selectedDoctor.rating} <Star size={18} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Heart, HeartOff, Star } from 'lucide-react';
import Navbar from '../Component/Navbar';
import Logo from '../assets/Logo.png';

export default function DocDash() {
  // state to hold favs, selected doctor, all docs, sort type & search input
  const [favorites, setFavorites] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // fetch doctors + favs when component loads
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctors');
        const data = await response.json();
        if (data.status === 'ok') {
          setAllDoctors(data.data);
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
          setFavorites(data.data);
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

  // filtering and sorting doctors
  const sortedDoctors = [...allDoctors]
    .filter((doc) => {
      return doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'specialty') return a.specialty.localeCompare(b.specialty);
      return 0;
    });

  // handle add/remove favorite
  const toggleFavorite = async (doctor) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      // check if already in favs
      if (favorites.some((fav) => fav._id === doctor._id)) {
        // remove fav
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
          setFavorites(data.data);
        } else {
          console.error("Failed to remove favorite:", data.error);
        }
      } else {
        // add fav
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
          setFavorites(data.data);
        } else {
          console.error("Failed to add favorite:", data.error);
        }
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  // handle clicking doctor card
  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  // close popup
  const closePopup = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* navbar with logo */}
      <Navbar logo={Logo} />

      <div className="px-6 py-4">
        {/* search bar */}
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

        {/* sorting options */}
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

        {/* doctor cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {sortedDoctors.map((doc) => (
            <div
              key={doc._id}
              className="relative bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all aspect-square flex flex-col justify-between cursor-pointer"
              onClick={() => handleCardClick(doc)}
            >
              {/* heart icon for favorite */}
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10"
                onClick={(e) => {
                  e.stopPropagation(); // so card click doesn’t trigger
                  toggleFavorite(doc);
                }}
              >
                {favorites.some((fav) => fav._id === doc._id)
                  ? <Heart fill="red" color="red" size={20} />
                  : <HeartOff size={20} />}
              </button>

              {/* doc image */}
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

              {/* doctor details */}
              <div>
                <p className="font-semibold text-gray-700">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.title}</p>
                <p className="text-base text-gray-600 mt-2">{doc.specialty}</p>
                <p className="flex items-center text-yellow-500 font-semibold ">{doc.rating} <Star size={18} fill="currentColor" className="ml-1" /></p>
              </div>
            </div>
          ))}
        </div>

        {/* no doctors found */}
        {sortedDoctors.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No doctors found.</p>
        )}
      </div>

      {/* popup with selected doctor info */}
      {selectedDoctor && (
        <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: 'rgba(255, 255, 255, 0.84)' }}>
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full mx-4 relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-black hover:text-black"
              onClick={closePopup}
            >
              ✖
            </button>

            <div className="flex gap-6">
              {/* left side image */}
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

              {/* right side doctor info */}
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
                    <p>{selectedDoctor.about}</p>
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

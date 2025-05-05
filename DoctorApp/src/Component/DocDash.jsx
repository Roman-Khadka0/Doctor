import { useState } from 'react';
import { Heart, HeartOff } from 'lucide-react';
import Navbar from '../Component/Navbar'
import Logo from '../assets/Logo.png'

const allDoctors = [
  { id: 1, name: "Dr. Aayush silwal", title: "General physician" },
  { id: 2, name: "Dr. Roman khadka", title: "General physician" },
  { id: 3, name: "Dr. pranisha maharjan", title: "General physician" },
  { id: 4, name: "Dr. manawi", title: "General physician" },
  { id: 5, name: "Dr. aayush khatiwada", title: "General physician" },
  { id: 6, name: "Dr. swopnil sharma", title: "General physician" },
  { id: 7, name: "Dr. Ivana Cure", title: "General physician" },
  { id: 8, name: "Dr. Max Healey", title: "General physician" },
];

export default function DocDash() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const filteredDoctors = allDoctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleDoctors = showAll ? filteredDoctors : filteredDoctors.slice(0, 4);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar logo={Logo}  />


      {/* Content */}
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

        {/* Recommended Doctors */}
        <div className="mt-8 flex justify-between items-center">
          <h3 className="text-lg font-medium text-teal-600">Recommended Doctors</h3>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-teal-500 text-sm hover:underline"
          >
            {showAll ? 'Show Less' : 'See All'}
          </button>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {visibleDoctors.map((doc) => (
            <div
              key={doc.id}
              className="relative bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all aspect-square flex flex-col justify-between"
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                onClick={() => toggleFavorite(doc.id)}
                aria-label="Toggle Favorite"
              >
                {favorites.includes(doc.id)
                  ? <Heart fill="red" color="red" size={20} />
                  : <HeartOff size={20} />}
              </button>

              <div className="w-full aspect-square bg-blue-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={`/doctor${doc.id}.jpg`}
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

        {filteredDoctors.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No doctors found.</p>
        )}
      </div>
    </div>
  );
}

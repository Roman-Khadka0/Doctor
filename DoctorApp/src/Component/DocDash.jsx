import { useState, useEffect } from 'react';
import { Heart, HeartOff, Star } from 'lucide-react';
import Navbar from '../Component/Navbar';
import Logo from '../assets/Logo.png';

// const allDoctors = [
//   { id: 1, name: "Dr. Aayush silwal", title: "General physician" },
//   { id: 2, name: "Dr. Roman khadka", title: "General physician" },
//   { id: 3, name: "Dr. pranisha maharjan", title: "General physician" },
//   { id: 4, name: "Dr. manawi", title: "General physician" },
//   { id: 5, name: "Dr. aayush khatiwada", title: "General physician" },
//   { id: 6, name: "Dr. swopnil sharma", title: "General physician" },
//   { id: 7, name: "Dr. Ivana Cure", title: "Psychiatrist", details: true },
//   { id: 8, name: "Dr. Max Healey", title: "General physician" },
// ];

export default function DocDash() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);

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

    fetchDoctors();
  }, []);

  const filteredDoctors = allDoctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleDoctors = showAll ? filteredDoctors : filteredDoctors.slice(0, 4);

  

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

        <div className="mt-8 flex justify-between items-center">
          <h3 className="text-lg font-medium text-teal-600">Recommended Doctors</h3>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-teal-500 text-sm hover:underline"
          >
            {showAll ? 'Show Less' : 'See All'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {visibleDoctors.map((doc) => (
            <div
              key={doc.id}
              className="relative bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all aspect-square flex flex-col justify-between cursor-pointer"
              onClick={() => handleCardClick(doc)}
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(doc.id);
                }}
                aria-label="Toggle Favorite"
              >
                {/* {favorites.includes(doc.id)
                  ? <Heart fill="red" color="red" size={20} />
                  : <HeartOff size={20} />} */}
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

        {filteredDoctors.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No doctors found.</p>
        )}
      </div>
{/* Doctor Detail Popup with light transparent background */}
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
            src={`/doctor${selectedDoctor.id}.jpg`}
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
              {selectedDoctor.name} <span className="text-[#0000ff]">✔</span>
            </h2>
            <p className="text-base text-gray-600 mt-2">
              MBBS - {selectedDoctor.title || 'Doctor'}{' '}
              <span className="ml-2 px-2 py-0.5 text-sm bg-gray-100 rounded">
                4 Years
              </span>
            </p>

            <div className="mt-4 text-gray-800 text-base space-y-2">
              <p className="font-medium">📞 +977984355124</p>
              <p>
                {selectedDoctor.title === 'Psychiatrist'
                  ? "Dr. Ivana Cure is a dedicated psychiatrist with a strong commitment to delivering comprehensive mental health care..."
                  : "This doctor is known for providing excellent general medical care. Dr. takes a personal interest in each patient's health, making sure they feel heard, respected, and well cared for during every visit"}
              </p>
            </div>
          </div>

          <div className="mt-1 flex justify-between items-center text-base text-gray-800">

            <p>
              Appointment fee:{' '}
              <span className="font-semibold text-black">$30</span>
            </p>
            <div className="flex items-center text-yellow-500 font-semibold">
              4.5 <Star size={18} fill="currentColor" className="ml-1" />
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

import { useState } from "react";
import Background from "../assets/background.png";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const doctors = [
  { id: 1, name: "Dr. Aayush Sharma", specialty: "Cardiologist" },
  { id: 2, name: "Dr. Bina Thapa", specialty: "Dermatologist" },
  { id: 3, name: "Dr. Rajiv Koirala", specialty: "Pediatrician" },
];

export default function Appointment() {
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    name: "",
    email: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data:", formData);
    alert("Appointment submitted!");
    // Add your API call or navigation logic here
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <header className="py-4 w-full absolute top-0 left-0 bg-[#258C9B]">
  <div className="container mx-auto px-4 flex-center items-center justify-between">
    <div className="flex items-center">
      <div className="mr-10">
        <img src={Logo} alt="logo" className="h-12 w-12" />
      </div>
      <nav className="hidden lg:flex space-x-10 text-xl">
  <Link to="/" className="text-white hover:text-gray-300 font-semibold">Home</Link>
  <Link to="/dashboard" className="text-white hover:text-gray-300 font-semibold">Doctors</Link>
  <Link to="/appointment" className="text-white hover:text-gray-300 font-semibold">Appointments</Link>
</nav>

    </div>
  </div>
</header>
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-[#258C9B] mb-6">
          Book a Doctor Appointment
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Select Doctor
            </label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name} - {doc.specialty}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-gray-700">
                Select Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-gray-700">
                Select Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Roman Khadka"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Romann@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Reason for Visit
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              placeholder="Short description"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#258C9B]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#258C9B] text-white py-3 rounded-lg font-semibold hover:bg-[#1e6c78] transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

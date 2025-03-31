import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Cdoctor from "../assets/Cdoctor.jpg";
import Appointment from "../assets/Appointment.jpg";
import Variety from "../assets/Variety.jpg";

function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: Cdoctor,
      title: "Keep yourself and your family healthy",
      buttonText: "Consult Now",
      link: "/consultation",
    },
    {
      image: Appointment,
      title: "Get expert consultations from professionals",
      buttonText: "Book Appointment",
      link: "/appointments",
    },
    {
      image: Variety,
      title: "Access a variety of health services",
      buttonText: "Explore Services",
      link: "/services",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-h-screen flex flex-col bg-black">
      {/* Navigation Bar */}
      <header className="border-b py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-10">
              <img src={Logo} alt="logo" className="h-15 w-15" />
            </div>
            <nav className="hidden lg:flex space-x-10 text-xl ">
            <NavItem text="Home" />
              <NavItem text="Find Doctors" />
              <NavItem text="Consultation" />
              <NavItem text="Appointments" />

            </nav>
          </div>
          <div className="flex items-center space-x-4 text-lg">
            <Link to="Login">
              <button className="flex items-center text-white font-semibold cursor-pointer hover:text-purple-500">
                <UserIcon className="w-4 h-4 mr-2" /> LOGIN
              </button>
            </Link>
            <Link to="/SignUp">
              <button className="border border-purple-500 text-purple-500 px-4 py-2 rounded-lg text-lg cursor-pointer hover:text-white   hover:border-white">
                SIGN UP
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-purple-700 relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center">
          {/* Text Section */}
          <div className="md:w-1/2 z-10 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
              {slides[currentSlide].title}
            </h1>
            <Link to={slides[currentSlide].link}>
              <button className="bg-white text-purple-700 px-8 py-4 rounded-lg text-xl flex items-center font-semibold hover:bg-gray-200 transition duration-300">
                {slides[currentSlide].buttonText}
                <ChevronRightIcon className="ml-3 w-6 h-6" />
              </button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 relative">
            <img
              src={slides[currentSlide].image}
              alt="Hero slide"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Slide Navigation Buttons */}
        <div className="absolute top-1/2 left-5 transform -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="bg-white text-purple-700 p-3 rounded-full shadow-lg hover:bg-purple-500 hover:text-2xl hover:text-white transition duration-300"
          >
            ❮
          </button>
        </div>
        <div className="absolute top-1/2 right-5 transform -translate-y-1/2">
          <button
            onClick={nextSlide}
            className="bg-white text-purple-700 p-3 rounded-full shadow-lg hover:bg-gray-300 transition duration-300 hover:bg-purple-500 hover:text-2xl hover:text-white  "
          >
            ❯
          </button>
        </div>
      </section>
    </div>
  );
}

const NavItem = ({ text }) => (
  <a href="#" className="text-white hover:text-purple-500 font-semibold text-lg whitespace-nowrap">
    {text}
  </a>
);

const UserIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default Landing;

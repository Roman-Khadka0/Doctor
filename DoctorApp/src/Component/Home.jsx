import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import assets (images)
import Logo from "../assets/Logo.png";
import Cdoctor from "../assets/Cdoctor.jpg";
import Appointment from "../assets/Appointment.jpg";
import Variety from "../assets/Variety.jpg";
import Background from "../assets/background.png";
import Power from "../assets/power.jpg";
import Schedule from "../assets/schedule.jpg";
import Booking from "../assets/booking.jpg";

function Landing() {
  // State to track which slide is currently shown in the hero section
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides array used for the rotating hero banner
  const slides = [
    {
      image: Cdoctor,
      title: "Keep yourself and your family healthy",
      buttonText: "Book Appointment",
      link: "/appointment",
    },
    {
      image: Appointment,
      title: "Get expert consultations from professionals",
      buttonText: "Book Appointment",
      link: "/appointment",
    },
    {
      image: Variety,
      title: "Access a variety of health services",
      buttonText: "Book Appointment",
      link: "/appointment",
    },
  ];

  // Function to go to the next slide in the hero section
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Auto-rotate the hero slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  // Features displayed in the "Why Choose EasyDoc" section
  const features = [
    {
      title: "SIMPLIFIES SCHEDULING",
      description:
        "With BOOKNMEET, scheduling occurs in one well organised platform...",
      image: Schedule,
    },
    {
      title: "POWERFUL.PERSONAL.ORGANISE",
      description:
        "BOOKNMEET offers a wide selection of online solutions...",
      image: Power,
    },
    {
      title: "BOOKNMEET QMM-TOKEN",
      description:
        "Improve outpatient (OP) flow at Hospitals & clinics with BOOKNMEET's QMM...",
      image: Booking,
    },
  ];

  // Handle newsletter subscription (placeholder function)
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
  };

  return (
    <div className="flex flex-col bg-[#258C9B]">
      
      {/* HEADER SECTION */}
      <header className="py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <div className="mr-10">
              <img src={Logo} alt="logo" className="h-15 w-15" />
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex space-x-10 text-xl">
              <NavItem text="Home" />
              <Link to="/dashboard"><NavItem text="Doctors" /></Link>
              <Link to="/appointment"><NavItem text="Appointments" /></Link>
            </nav>
          </div>

          {/* Login & Sign Up Buttons */}
          <div className="flex items-center space-x-4 text-lg">
            <Link to="/Login">
              <button className="flex items-center text-white font-semibold hover:text-gray-300">
                <UserIcon className="w-4 h-4 mr-2" /> LOGIN
              </button>
            </Link>
            <Link to="/SignUp">
              <button className="border border-white text-white px-4 py-2 rounded-lg hover:text-gray-300 hover:border-gray-300">
                SIGN UP
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center min-h-[80vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 z-0" />

        {/* Hero Content */}
        <div className="container mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center relative z-10">
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left text-[#4AA8B5] ">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              {slides[currentSlide].title}
            </h1>
            <Link to={slides[currentSlide].link}>
              <button className="bg-white text-[#4AA8B5] hover:text-white px-8 py-4 rounded-lg text-xl flex items-center font-semibold hover:bg-[#4AA8B5] transition duration-300">
                {slides[currentSlide].buttonText}
                <ChevronRightIcon className="ml-3 w-6 h-6" />
              </button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2 relative">
            <img
              src={slides[currentSlide].image}
              alt="Hero slide"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            WHY CHOOSE EASYDOC
          </h2>
          <p className="mt-4 text-[#258C9B] text-lg">
            Online Appointment, Phone-in Appointment, Walk-in Appointment with Token
          </p>

          {/* Feature Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg transition duration-300 hover:scale-[1.02] transform"
              >
                <div className="flex justify-center">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="h-24 mb-6 object-contain"
                  />
                </div>
                <h3 className="text-[#258C9B] font-semibold text-xl mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-base text-justify">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#258C9B] text-gray-700 py-12 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Company Info */}
          <div>
            <img src={Logo} alt="Logo" className="h-10 mb-4" />
            <p className="mb-4 text-sm text-white font-medium">
              ONLINE APPOINTMENT SCHEDULING PLATFORM
            </p>
            <p className="text-sm mb-1 text-white">📍 herald Kathmandu, Naxal</p>
            <p className="text-sm mb-1 text-white">📞 +977 9811203806</p>
            <p className="text-sm mb-4 text-white">📧 post@easydoc.com</p>

            <p className="mb-2 font-medium text-white">FOLLOW US</p>
            <a href="#">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
            </a>
          </div>

          {/* Quick Links & Subscription */}
          <div>
            <ul className="space-y-2 text-sm text-white">
              <li>Clinical Procedure Scheduling</li>
              <li>Vaccination</li>
              <li>Nutrition Practice</li>
              <li>Compare Plans</li>
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Personal Information Policy</li>
              <li>Video Consultation Policy</li>
              <li>Trade Mark Notice</li>
              <li>FAQ</li>
              <li>Special Offer</li>
            </ul>

            {/* Subscription Form */}
            <form onSubmit={handleSubscribe} className="mt-6">
              <p className="text-sm mb-2 font-medium text-white">
                Subscribe to EasyDoc:
              </p>
              <input
                type="email"
                placeholder="Email"
                className="border border-white text-white px-4 py-2 rounded w-full mb-2 bg-transparent"
                required
              />
              <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded">
                Submit
              </button>
            </form>
          </div>

          {/* Call to Actions & Mission */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="bg-sky-500 text-white px-3 py-1 rounded text-sm">
                Request EasyDoc Demo
              </button>
              <button className="bg-sky-500 text-white px-3 py-1 rounded text-sm">
                Career@EasyDoc
              </button>
              <button className="bg-sky-500 text-white px-3 py-1 rounded text-sm">
                WEBSTORIES
              </button>
            </div>
            <p className="text-sm text-white font-semibold mb-2">
              YOUR GUARANTEED MOBILE ONLINE APPOINTMENT
            </p>
            <p className="text-sm text-white">
              With EasyDoc productivity tool, be successful in avoiding unscheduled
              absences. Let our tool support you to be a leader in your medical
              practice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// NavItem Component - used for main navigation links
const NavItem = ({ text }) => (
  <a href="#" className="text-white font-semibold text-lg hover:text-gray-300">
    {text}
  </a>
);

// User Icon (SVG)
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

// Chevron Icon (SVG)
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

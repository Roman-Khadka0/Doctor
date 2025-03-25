import Logo from "../assets/Logo.png";

function Landing() {
  return (
    <div className="max-h-screen flex flex-col bg-black">
      {/* Navigation Bar */}
      <header className="border-b py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-10">
              <img src={Logo} alt="logo" className="h-40 w-40" />
            </div>

            <nav className="hidden lg:flex space-x-10 text-xl">
              <NavItem text="Find Doctors" />
              <NavItem text="Consultation" />
              <NavItem text="Specialist" />
              <NavItem text="Packages" />
              <NavItem text="Tests" />
              <NavItem text="Appointments" />
            </nav>
          </div>
          <div className="flex items-center space-x-4 text-lg">
            <button className="flex items-center text-white font-semibold">
              <UserIcon className="w-4 h-4 mr-2" /> LOGIN
            </button>
            <button className="border border-purple-500 text-purple-500 px-4 py-2 rounded-lg text-lg">
              SIGN UP
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-purple-700 relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
              Keep yourself and your family healthy
            </h1>
            <button className="bg-purple-500 hover:bg-purple-800 text-white px-8 py-4 rounded-lg text-xl flex items-center font-semibold">
              Consult Now <ChevronRightIcon className="ml-3 w-6 h-6" />
            </button>
          </div>
          <div className="md:w-1/2 relative">
            <img
              src="https://placehold.co/600x500"
              alt="Happy family with baby"
              className="w-full h-auto object-cover"
            />
          </div>
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

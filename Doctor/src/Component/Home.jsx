import Logo from "../assets/Logo.png";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
    {/* Navigation Bar */}
    <header className="border-b py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <img src={Logo} alt="logo" className="h-10" />
          </div>
          <nav className="hidden lg:flex space-x-4 text-sm">
            <NavItem text="Find Doctors" />
            <NavItem text="Consultation" />
            <NavItem text="Specialist" />
            <NavItem text="Packages" />
            <NavItem text="Tests" />
            <NavItem text="Appointments" />
          </nav>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <button className="flex items-center text-gray-700 font-medium">
            <UserIcon className="w-3 h-3 mr-1" /> LOGIN
          </button>
          <button className="border border-red-500 text-red-500 px-3 py-1 rounded text-xs">
            SIGN UP
          </button>
        </div>
      </div>
    </header>
  

      {/* Hero Section */}
      <section className="bg-purple-700 relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Keep yourself and your family healthy
            </h1>
            <button className="bg-purple-500 hover:bg-purple-800 text-white px-6 py-3 rounded-md flex items-center font-medium">
              Consult Now <ChevronRightIcon className="ml-2 w-5 h-5" />
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
  <a href="#" className="text-gray-700 hover:text-red-500 font-medium text-sm whitespace-nowrap">
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

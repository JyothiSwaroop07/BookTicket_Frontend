import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const cities = [
    "Bengaluru", "Mumbai", "Delhi", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad",
    "Jaipur", "Lucknow", "Surat", "Kanpur", "Nagpur", "Indore", "Vadodara", "Ludhiana",
    "Coimbatore", "Agra", "Nashik", "Patna", "Meerut", "Bhopal", "Kochi", "Visakhapatnam",
    "Rajkot", "Vijayawada", "Madurai", "Jammu", "Jodhpur", "Chandigarh", "Guwahati",
  ];

  const { city, setCity } = useAppContext(); // Access setCity from AppContext
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity); // Update global city state
  };

  return (
    <nav className="bg-primary text-secondary py-3 sticky">
      <div className="flex items-center justify-between px-4">
        <div className="flex flex-col mr-2 items-center">
          <div className="flex">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <h1 className="ml-2 text-xl font-bold">Book Ticket</h1>
          </div>
          
        </div>

        {/* Always visible Search Bar */}
        <div className="flex-grow max-w-lg flex items-center mx-4">
          <input
            type="text"
            placeholder="Search for Movies in your City"
            className="border border-primary rounded-md px-4 py-2 w-full outline-none cursor-pointer"
          />
        </div>

        {/* Desktop navbar items */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative outline-none cursor-pointer">
            <select
              value={city || ""}
              onChange={handleCityChange} // Handle city change
              className="text-secondary text-sm bg-white border border-primary rounded-md px-4 py-2"
            >
              <option value="" disabled>Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-buttonHover"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>

        {/* Hamburger Menu Button */}
        <button className="text-secondary text-2xl" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <div className="ml-6 md:hidden relative outline-none cursor-pointer">
            <select
              value={city || ""}
              onChange={handleCityChange} // Handle city change
              className="text-secondary text-sm bg-white border border-primary rounded-md px-4 py-2"
            >
              <option value="" disabled>Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="w-[100vw] flex flex-row justify-end">
          <div className="bg-white absolute border-b border-primary w-full md:w-[20vw]">
            <ul className="p-4">
              <li>
                <button
                  className="text-secondary text-lg py-2 w-full text-left"
                  onClick={() => navigate("/about")}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  className="text-secondary text-lg py-2 w-full text-left"
                  onClick={() => navigate("/help")}
                >
                  Help and Support
                </button>
              </li>
              <li>
                <button
                  className="text-secondary text-lg py-2 w-full text-left"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

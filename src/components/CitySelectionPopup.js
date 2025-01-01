import React, { useState } from "react";
import { useAppContext } from "../context/AppContextProvider";

const cities = ["Bengaluru", "Mumbai", "Delhi", "Chennai", "Kolkata"];

const CitySelectPopup = () => {
  const { city, setCity } = useAppContext();
  const [selectedCity, setSelectedCity] = useState("");

  const handleCitySelection = () => {
    if (selectedCity) {
      setCity(selectedCity);
    }
  };

  if (city) return null; // Hide popup if city is already selected

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Select Your City</h2>
        <select
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button
          onClick={handleCitySelection}
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CitySelectPopup;

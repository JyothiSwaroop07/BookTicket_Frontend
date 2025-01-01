import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [city, setCity] = useState(() => {
    // Get the city from local storage if it exists
    return localStorage.getItem("selectedCity") || null;
  });

  useEffect(() => {
    // Store the city in local storage whenever it changes
    if (city) {
      localStorage.setItem("selectedCity", city);
    }
  }, [city]);

  return (
    <AppContext.Provider value={{ city, setCity }}>
      {children}
    </AppContext.Provider>
  );
};

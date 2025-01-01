import React from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContextProvider";

import {fetchMoviesByCity} from '../services/api'


const Movies = () => {

  const { city } = useAppContext();
  // const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchMoviesByCity(city); 
        console.log(response.data);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [city]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-end">
        
        <div>
          <div className="md:w-[78vw] lg:w-[80vw]">
            <h2 className="text-center md:text-left font-bold text-lg px-6">Movies in {city}</h2>
          </div>
          
          <div className="p-4 grid grid-cols-2 md:grid-cols-2 md:w-[78vw] lg:grid-cols-4 gap-6 lg:w-[80vw]">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;

import React from "react";
import { useAppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import {fetchMoviesByCity} from '../services/api'

const Home = () => {
  const { city } = useAppContext();
  const navigate = useNavigate();

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

  if (!city) return null; // Wait until city is selected

  return (
    <div>
      <Navbar />
      <div className="mt-8">
        <div className="flex flex-row justify-between">
          <h2 className="text-left font-bold text-xl px-8">Recommended Movies in {city}</h2>
          <h4
            className="underline text-right mr-8 cursor-pointer text-red-600 text-sm"
            onClick={() => navigate("/movies")}
          >
            See All
          </h4>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            .slice(0, 7)
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

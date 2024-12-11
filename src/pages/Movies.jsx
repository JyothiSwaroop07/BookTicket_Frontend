import React from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

const Movies = ({movies}) => {

  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-end">
        
        <div>
          <div className="md:w-[78vw] lg:w-[80vw]">
            <h2 className="text-center md:text-left font-bold text-lg px-6">Movies in Bengaluru</h2>
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

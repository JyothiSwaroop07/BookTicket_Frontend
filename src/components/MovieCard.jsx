import React from "react";
import { useNavigate } from "react-router-dom";


const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const goToShowsPage = () => {
    navigate(`/movies/${movie.id}/shows?city=Bengaluru`);
  };

  return (
    <div className="bg-secondary rounded-md p-2 text-center">
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="h-[230px] md:h-[300px] object-cover rounded-md"
        
      />
      <div className="text-left pl-2">
        <h2 className="mt-2 text-textPrimary text-xs md:text-lg font-bold">{movie.title}</h2>
        <h3 className="text-textPrimary text-xs md:text-sm font-normal text-gray-700">{movie.genre}</h3>
        <button className="bg-gray-800 px-2 py-1 text-white text-secondary text-sm md:text-md mt-2 rounded-md hover:bg-buttonHover"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent div click
            goToShowsPage();
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

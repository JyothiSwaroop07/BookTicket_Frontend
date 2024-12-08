import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-secondary rounded-md p-2 text-center">
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="w-full h-58 object-cover rounded-md"
      />
      <h2 className="mt-2 text-textPrimary text-lg font-bold">{movie.title}</h2>
      <h3 className="mt-2 text-textPrimary text-lg font-bold">{movie.genre}</h3>
      <button className="bg-primary text-secondary px-4 py-2 mt-4 rounded-md hover:bg-buttonHover">
        Book Now
      </button>
    </div>
  );
};

export default MovieCard;

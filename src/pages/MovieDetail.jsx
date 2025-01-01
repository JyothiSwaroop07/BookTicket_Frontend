import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const { fetchMovieDetails } = require("../services/api");

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const result = await fetchMovieDetails(movieId);
        setMovie(result.data);
      } catch (error) {
        console.log("error fetching Movie", error.response?.data || error.message);
      }
    };
    fetchMovieDetail();
  }, [city, movieId]);

  if (!movie) return <div>Loading...</div>;

  const getOrdinal = (day) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const value = day % 100;
    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
  };

  const goToShowsPage = () => {
    navigate(`/movies/${movieId}/shows?city=${city}`)
  }

  return (
    <div className="movie-page">
      {/* Cover Image Section */}
      <div
        className="hidden md:block relative w-[100%] md:h-[65vh] lg:h-[70vh] xl:h-[82vh] bg-cover bg-cover "
        style={{ backgroundImage: `url(${movie.cover_poster_url})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70">
        <div className="flex flex-col md:flex-row items-center p-10">
        {/* Poster Image */}
        <div className="w-full h-full md:w-1/4 lg:w-1/5">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Details */}
            <div className="flex flex-col  ml-0 md:ml-8 md:my-auto gap-6 text-white">
            <h1 className="text-3xl font-bold">{movie.movie_name}</h1>
            
            {/* <p className="mt-4">{movie.description}</p> */}
            <p className="mt-2">
                {movie.duration} &nbsp;&nbsp;&nbsp;&nbsp; <span className="bg-white text-black px-2 py-1 rounded-md">  {movie.genre}  </span>
            
                &nbsp;&nbsp;&nbsp;&nbsp;
            
                <strong> {new Intl.DateTimeFormat('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    }).format(new Date(movie.release_date)).replace(/^(\d+)/, (day) => `${day}${getOrdinal(day)}`)}  </strong>
                            </p>

                <button className="bg-red-800 mt-2 text-white font-bold py-2 rounded-md text-xl" 
                onClick={(e) => {
                    e.stopPropagation(); // Prevent parent div click
                    goToShowsPage();
                    }}>
                    Book Tickets
                </button>
                </div>
            </div>
        </div>
      </div>

      <div className="md:hidden relative w-full h-[50vh] overflow-hidden">
        <iframe
            src={movie.trailer_url.replace('watch?v=', 'embed/')}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
        ></iframe>
    </div>

      {/* Content Section */}
      
      <div className="px-2 py-2 md:p-4 overflow-hidden gap-5">

        <div className="flex flex-col md:hidden ml-0 md:ml-8 md:my-auto">
            
            
            {/* <p className="mt-4">{movie.description}</p> */}
            <p className="mt-2 text-black text-md">
                {movie.duration}  <span className="bg-white text-black px-2 py-1 rounded-md">  {movie.genre}  </span>
                     
            
                 {new Intl.DateTimeFormat('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    }).format(new Date(movie.release_date)).replace(/^(\d+)/, (day) => `${day}${getOrdinal(day)}`)} 
                </p>

                
            </div>     

        <div className="next-details mt-2 md:mt-4 mb-1 md:mb-3 text-md md:text-2xl">
             <h3 className="font-semibold">
                About the movie
             </h3>

            <p className="font-normal">
                {movie.description}..
            </p>
        </div> 
        
        </div>



      <div className="w-[100vw] md:hidden flex justify-center absolute bottom-3">
      <button className="bg-red-800  mt-2 text-white font-bold py-2 rounded-md text-xl w-[90vw]" 
                onClick={(e) => {
                    e.stopPropagation(); // Prevent parent div click
                    goToShowsPage();
                    }}>
                    Book Tickets
        </button>
        </div>
    </div>
  );
};

export default MovieDetail;

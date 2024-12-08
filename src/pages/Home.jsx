import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { fetchLatestMoviesByCity } from "../services/api";

import Slider from 'react-slick'
import './Home.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


const NextArrow = ({ className, style, onClick }) => (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "50%",
        zIndex: 10, 
        right: "10px",
      cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
  
  const PrevArrow = ({ className, style, onClick }) => (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "50%",
        zIndex: 10, 
      left: "10px",
      
      }}
      onClick={onClick}
    />
  );

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    arrows: true,
    slidesToScroll: 1,
    slidesToShow: 5, // Default for large screens
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // For medium screens (up to 1024px wide)
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600, // For small screens (up to 600px wide)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Extra small screens (up to 480px wide)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchLatestMoviesByCity("Bengaluru"); // Default city
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-8">
      <div className="flex flex-row justify-between">
      <h2 className="text-left font-bold text-xl px-8">Recommended Movies</h2>
      <h4 className="underline text-right mr-8 cursor-pointer text-red-600 text-sm" onClick={()=>navigate("/movies")}>See All</h4>
      </div>
       
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
            ))}
            </div>
       
      </div>
    </div>
  );
};

export default Home;

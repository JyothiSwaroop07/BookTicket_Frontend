import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
const {fetchShowsByMovie} = require('../services/api')



const Shows = () => {
  const { movieId } = useParams(); // Extract movie ID from the URL
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city"); // Get the city parameter from the query string

  const [theaters, setTheaters] = useState([]);
  const [movieName, setMovieName] = useState("")

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetchShowsByMovie(movieId, city);
        console.log(response.data.theatres)
        setTheaters(response.data.theatres);
        setMovieName(response.data.movieName)
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };

    fetchShows();
  }, [city, movieId]);

  return (
    <>
    <Navbar/>
    <div className="p-4">
        <div className="title-container py-6 px-6">
            <h2 className="title text-xl font-normal">{movieName}</h2>
          </div>
          <hr/>
      {theaters.map((theater) => (
        <div key={theater.id} className="mb-6 ml-6">
          <h2 className="mt-4 text-gray-800 font-semibold mb-2">{theater.name}</h2>
          <ul className="flex flex-row gap-4">
            {theater.shows.map((show) => (
              <li key={show.id} className="mt-2">
                <div className=" ">
                  <h2>
                     
                    {new Date(show.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()} 
                    
                  </h2>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    </>
  );
};

export default Shows;

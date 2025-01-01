import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const { fetchShowsByMovie } = require('../services/api');

const Shows = () => {
  const navigate=useNavigate();

  const { movieId } = useParams(); // Extract movie ID from the URL
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city"); // Get the city parameter from the query string

  const [theaters, setTheaters] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [groupedShows, setGroupedShows] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetchShowsByMovie(movieId, city);
        setTheaters(response.data.theatres);
        setMovieName(response.data.movieName);

        // Group shows by date
        const grouped = groupShowsByDate(response.data.theatres);
        setGroupedShows(grouped);

        console.log(grouped);

        // Set the first available date as selected by default
        const dates = Object.keys(grouped);
        if (dates.length > 0) setSelectedDate(dates[0]);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };

    fetchShows();
  }, [city, movieId]);

  // Function to group shows by date and theater
  const groupShowsByDate = (theaters) => {
    const grouped = {};
    theaters.forEach((theater) => {
      theater.shows.forEach((show) => {
        const date = new Date(show.start_time).toISOString().split("T")[0]; // Extract date
        if (!grouped[date]) {
          grouped[date] = {};
        }
        if (!grouped[date][theater.name]) {
          grouped[date][theater.name] = [];
        }
        grouped[date][theater.name].push(show);
      });
    });
    return grouped;
  };

  return (
    <div className="">
      
      <div className="py-4 px-6">
        <div className="title-container py-6 px-6">
          <h2 className="title text-3xl font-normal">{movieName}</h2>
        </div>
      </div>
      <hr />

      <div className="py-1 px-6">
        {/* Date Filter Buttons */}
        <div className="date-buttons flex flex-wrap gap-4 mt-4">
          {Object.keys(groupedShows).map((date) => {
            const parsedDate = new Date(date);
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded text-center ${
                  selectedDate === date ? "bg-gray-800 text-white" : "bg-white"
                }`}
              >
                <div className="flex flex-col items-center h-[46px]">
                  <span className="font-medium text-[10px]">
                    {parsedDate.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className="text-[14px] font-semibold">
                    {parsedDate.toLocaleDateString("en-US", { day: "numeric" })}
                  </span>
                  <span className="font-medium text-[10px]">
                    {parsedDate.toLocaleDateString("en-US", { month: "short" })}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Shows for the Selected Date */}
        <div>
          {groupedShows[selectedDate] &&
            Object.entries(groupedShows[selectedDate]).map(
              ([theaterName, shows]) => (
                <div key={theaterName} className="mb-6 md:ml-6 xl:flex xl:flex-row xl:mt-8">
                  <h2 className="mt-4 text-gray-800 font-semibold mb-2 xl:w-[20vw]">
                    {theaterName}
                  </h2>
                  <ul className="flex flex-row flex-wrap gap-4 xl:w-[75vw]">
                    {shows.map((show, index) => (
                      <li key={index} className="mt-2 relative group">

                        {/* Hover Content */}
                        <div className="absolute hidden group-hover:block bottom-full -left-[calc(50%)] mb-2 bg-white border border-gray-300 rounded shadow-lg w-max z-10">
                          <ul className="p-2 flex flex-row">
                            {show.prices.map((price, priceIndex) => (
                              <li key={priceIndex}>
                                <div className="flex flex-col justify-center px-4 py-1 text-center">
                                <span className={`text-gray-800 font-bold text-[18px]`}>Rs. {price.price}</span>
                                <span className="font-normal text-gray-500 text-[10px]">{price.category}</span>
                                </div>
                              </li> 
                            ))}
                          </ul>
                        </div>

                        {/* Show Box */}
                        <div 
                          className={`show-box border-[1px] py-[6px] px-[12px] border-gray-800 rounded-sm cursor-pointer hover:shadow-lg ${show.availability_percentage<30 ? 'text-red-700' : show.availability_percentage<60? 'text-yellow-600' : 'text-green-700'}`}
                          onClick={()=>navigate(`/movies/selectseats/${show.id}`)}
                          >
                          <h2>
                            {new Date(show.start_time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }).toLowerCase()}
                          </h2>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
        </div>


      </div>
    </div>
  );
};



export default Shows;
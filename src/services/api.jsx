import axios from "axios";
const API = axios.create({
  baseURL: "https://bookticketbackend.vercel.app", // Replace with your backend URL
});

export const fetchMoviesByCity = (city) => API.get(`/movies/city?city=${city}`);
export const fetchShowsByMovie = (movieId, city) => API.get(`/movies/${movieId}/shows?city=${city}`) 
export const fetchSeatsByShow = (showId) => API.get(`/movies/selectseats/${showId}`);

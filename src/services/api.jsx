import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchMoviesByCity = (city) => API.get(`/movies/city?city=${city}`);
export const fetchShowsByMovie = (movieId, city) => API.get(`/movies/${movieId}/shows?city=${city}`) 
export const fetchSeatsByShow = (showId) => API.get(`/movies/selectseats/${showId}`);
export const fetchMovieDetails = (movieId, city) => API.get(`/movies/${movieId}?city=${city}`);

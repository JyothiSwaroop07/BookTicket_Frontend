import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend URL
});

export const fetchLatestMoviesByCity = (city) => API.get(`/movies/city/recommended?city=${city}`)
export const fetchMoviesByCity = (city) => API.get(`/movies/city?city=${city}`);

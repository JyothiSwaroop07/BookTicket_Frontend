import axios from "axios";
const API = axios.create({
  baseURL: "http://192.168.31.246:3000", // Replace with your backend URL
});

export const fetchLatestMoviesByCity = (city) => API.get(`/movies/city/recommended?city=${city}`)
export const fetchMoviesByCity = (city) => API.get(`/movies/city?city=${city}`);

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";

const {fetchMoviesByCity} = require('./services/api')

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchMoviesByCity("Bengaluru"); 
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home movies={movies}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies movies={movies}/>} />
        <Route path="/movies/:movieId/shows" element={<Shows />} />
      </Routes>
    </Router>
  );
}

export default App;
